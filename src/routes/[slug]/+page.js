import rankings from '#lib/data/rankings.json';
import nhlMeta from '#lib/data/nhl-meta.json';
import { error } from '@sveltejs/kit';
import { teams } from '#lib/data/teams.js';
import { teamPageLoaders } from '#lib/data/teamPages.js';

export function entries() {
    return teams.map((team) => ({
        slug: team.slug
    }));
}

export async function load({ params }) {
    const equipe = teams.find((team) => team.slug === params.slug);

    if (!equipe) {
        error(404, 'Équipe introuvable');
    }

    const loadPage = teamPageLoaders[`./team-pages/${equipe.slug}.html`];

    if (!loadPage) {
        error(500, `La page source de ${equipe.nom} est indisponible.`);
    }

    let contenu = await loadPage();

    if (typeof contenu !== 'string') {
        error(500, `La page source de ${equipe.nom} est invalide.`);
    }

    const stats = rankings.nhl.rows.find(row => row.slug === equipe.slug);
    if (stats) {
        const values = { matchs: stats.gp, wins: stats.wins, losses: stats.losses + stats.ot, points: stats.points };
        for (const [className, value] of Object.entries(values)) {
            const pattern = new RegExp(`(<div class="${className}">\\s*<p>[^<]*</p>\\s*<p>)[^<]*(</p>)`);
            contenu = contenu.replace(pattern, (_match, before, after) => `${before}${value}${after}`);
        }
        contenu = contenu.replace(/<p class="team-stats-note">[\s\S]*?<\/p>/,
            `<p class="team-stats-note">Saison ${nhlMeta.seasonLabel} · Statistiques au <time datetime="${nhlMeta.standingsDate}">${nhlMeta.standingsLabel}</time>.
            Défaites : ${stats.losses} dans le temps réglementaire et ${stats.ot} en prolongation ou aux tirs au but.
            <a href="${nhlMeta.standingsSource}">Source NHL</a>.</p>`);
    }
    return { equipe, contenu };
}
