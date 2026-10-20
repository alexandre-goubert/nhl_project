import { readFile, writeFile, rename } from 'node:fs/promises';
import { teams } from '../src/lib/data/teams.js';

const base = 'https://api-web.nhle.com/v1';
const dataDir = new URL('../src/lib/data/', import.meta.url);
const byCode = new Map(teams.map(team => [team.abreviation, team]));
const label = date => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));

async function get(path) {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const response = await fetch(`${base}/${path}`, { signal: AbortSignal.timeout(20000) });
            if (!response.ok) throw new Error(`HTTP ${response.status} : ${path}`);
            return await response.json();
        } catch (error) {
            if (attempt === 2) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
    }
}

async function update() {
    const { standings } = await get('standings/now');
    if (!Array.isArray(standings) || standings.length !== teams.length) throw new Error('Classement incomplet.');
    const season = standings[0].seasonId;
    const date = standings[0].date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isInteger(season)) throw new Error('Saison ou date invalide.');
    const seen = new Set();
    for (const row of standings) {
        const code = row.teamAbbrev?.default;
        if (!byCode.has(code) || seen.has(code) || row.seasonId !== season || row.date !== date) throw new Error('Équipes ou saisons incohérentes.');
        seen.add(code);
        for (const field of ['gamesPlayed', 'wins', 'losses', 'otLosses', 'points']) {
            if (!Number.isInteger(row[field]) || row[field] < 0) throw new Error(`Statistique invalide : ${code}/${field}`);
        }
        if (row.gamesPlayed !== row.wins + row.losses + row.otLosses) throw new Error(`Bilan incohérent : ${code}`);
    }
    const definitions = [
        ['nhl', 'Classement NHL', 'leagueSequence', () => true],
        ['eastern', 'Conférence Est', 'conferenceSequence', r => r.conferenceName === 'Eastern'],
        ['western', 'Conférence Ouest', 'conferenceSequence', r => r.conferenceName === 'Western'],
        ...['Atlantic', 'Metropolitan', 'Central', 'Pacific'].map(d => [d.toLowerCase(), `Division ${d}`, 'divisionSequence', r => r.divisionName === d])
    ];
    const rankings = Object.fromEntries(definitions.map(([key, title, sequence, filter]) => {
        const rows = standings.filter(filter).sort((a, b) => a[sequence] - b[sequence]).map(r => ({
            rank: r[sequence], name: byCode.get(r.teamAbbrev.default).nom, slug: byCode.get(r.teamAbbrev.default).slug,
            gp: r.gamesPlayed, wins: r.wins, losses: r.losses, ot: r.otLosses, points: r.points, streak: `${r.streakCode}${r.streakCount}`
        }));
        if (rows.length !== (key === 'nhl' ? 32 : ['eastern', 'western'].includes(key) ? 16 : 8)) throw new Error(`Classement incomplet : ${key}`);
        return [key, { title, rows }];
    }));

    // Relire toute la saison permet aussi de récupérer les corrections de scores.
    const games = new Map();
    const today = new Date().toISOString().slice(0, 10);
    const cursor = new Date(`${String(season).slice(0, 4)}-09-01T12:00:00Z`);
    while (cursor.toISOString().slice(0, 10) <= today) {
        const schedule = await get(`schedule/${cursor.toISOString().slice(0, 10)}`);
        if (!Array.isArray(schedule.gameWeek)) throw new Error('Calendrier invalide.');
        for (const day of schedule.gameWeek) {
            if (!Array.isArray(day.games)) throw new Error('Journée invalide.');
            for (const game of day.games) {
                if (game.season !== season || game.gameType !== 2 || !['OFF', 'FINAL'].includes(game.gameState)) continue;
                const sides = [game.awayTeam, game.homeTeam].map((side, index) => {
                    const team = byCode.get(side.abbrev);
                    if (!team || !Number.isInteger(side.score)) throw new Error(`Match invalide : ${game.id}`);
                    return { code: side.abbrev, slug: team.slug, name: team.nom, score: side.score, home: index === 1,
                        winner: side.score > (index === 0 ? game.homeTeam.score : game.awayTeam.score) };
                });
                games.set(game.id, { date: day.date, dateLabel: label(day.date), teams: sides.map(s => s.code),
                    status: ({ OT: 'Après prolongation', SO: 'Après tirs au but' })[game.gameOutcome?.lastPeriodType] ?? 'Terminé',
                    venue: game.venue?.default ?? '', nhlUrl: `https://www.nhl.com/gamecenter/${game.id}`, sides,
                    start: game.startTimeUTC });
            }
        }
        cursor.setUTCDate(cursor.getUTCDate() + 7);
    }
    const matches = [...games.values()].sort((a, b) => b.start.localeCompare(a.start)).map(({ start, ...match }) => match);
    if (!matches.length && standings.some(r => r.gamesPlayed > 0)) throw new Error('Résultats manquants.');
    const oldMeta = await readFile(new URL('nhl-meta.json', dataDir), 'utf8').then(JSON.parse).catch(() => null);
    const oldMatches = JSON.parse(await readFile(new URL('matches.json', dataDir), 'utf8'));
    if (oldMeta?.seasonId === season && matches.length < oldMatches.length) throw new Error('Des matchs ont disparu : conservation des données précédentes.');
    const meta = { seasonId: season, seasonLabel: `${String(season).slice(0, 4)}–${String(season).slice(4)}`,
        standingsDate: date, standingsLabel: label(date), updatedAt: new Date().toISOString(),
        firstMatchDate: matches.at(-1)?.date ?? '', lastMatchDate: matches[0]?.date ?? '',
        firstMatchLabel: matches.at(-1)?.dateLabel ?? '', lastMatchLabel: matches[0]?.dateLabel ?? '',
        standingsSource: `${base}/standings/${date}` };
    // Aucune écriture avant la fin des téléchargements et des validations.
    const files = [['rankings.json', rankings], ['matches.json', matches], ['nhl-meta.json', meta]];
    for (const [file, value] of files) await writeFile(new URL(`${file}.tmp`, dataDir), JSON.stringify(value, null, 2) + '\n');
    for (const [file] of files) await rename(new URL(`${file}.tmp`, dataDir), new URL(file, dataDir));
    console.log(`NHL : ${standings.length} équipes, ${matches.length} matchs. Classements au ${date}.`);
}
update().catch(error => { console.error(`Actualisation interrompue : ${error.message}`); process.exitCode = 1; });
