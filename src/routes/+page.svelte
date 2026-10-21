<script>
    import nhlMeta from '#lib/data/nhl-meta.json';
    import { asset, resolve } from '$app/paths';
    import Footer from '#lib/components/Footer.svelte';
    import TeamCard from '#lib/components/TeamCard.svelte';
    import { teams } from '#lib/data/teams.js';
    import matches from '#lib/data/matches.json';
    import rankings from '#lib/data/rankings.json';
    import { onMount } from 'svelte';

    const recentMatches = [...matches].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    const conferenceRankings = [
        { id: 'eastern', label: 'Conférence Est', rows: rankings.eastern.rows.slice(0, 8) },
        { id: 'western', label: 'Conférence Ouest', rows: rankings.western.rows.slice(0, 8) }
    ];
    const teamImageBase = asset('images/logos/TOR.png').replace(/TOR\.png$/, '');
    const codes = Object.fromEntries(teams.map((team) => [team.slug, team.abreviation]));

    /** @type {typeof teams} */
    let featuredTeams = $state([]);

    onMount(() => {
        const equipesMelangees = [...teams];

        for (let i = equipesMelangees.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [equipesMelangees[i], equipesMelangees[j]] =
                [equipesMelangees[j], equipesMelangees[i]];
        }

        featuredTeams = equipesMelangees.slice(0, 4);
    });
</script>

<svelte:head>
    <title>NHL Zone — Toute la passion de la NHL</title>
    <meta name="description" content="Explorez les franchises NHL, consultez les résultats et classements de la saison 2025-2026, et testez vos connaissances avec nos quiz." />
</svelte:head>

<main class="home-page">
    <section class="hero" aria-labelledby="home-title">
        <div class="hero-content">
            <h1 id="home-title">Toute la passion<br />de la NHL</h1>
            <p class="hero-description">Résultats, équipes, joueurs et quiz : explorez tout l’univers de la NHL.</p>
            <div class="hero-actions">
                <a class="button" href={resolve('/equipes')}>Découvrir les équipes →</a>
                <a class="hero-link" href={resolve('/matchs')}>Consulter les résultats</a>
            </div>
        </div>
        <img class="hero-image" src={asset('images/index-img.png')} alt="Une patinoire de NHL entourée de ses supporters pendant un match" fetchpriority="high" />
    </section>

    <div class="home-content">
        <section class="home-section" aria-labelledby="results-title">
            <div class="section-heading">
                <div>
                    <h2 id="results-title">Derniers résultats disponibles</h2>
                </div>
                <a class="section-link" href={resolve('/matchs')}>Tous les matchs →</a>
            </div>
            <div class="results-grid">
                {#each recentMatches as match (match.nhlUrl)}
                    <article class="result-card">
                        <div class="result-heading">
                            <time datetime={match.date}>{match.dateLabel}</time>
                            <span class="status">{match.status}</span>
                        </div>
                        {#each match.sides as side (side.code)}
                            <div class="result-team" class:winner={side.winner}>
                                <span class="team-abbreviation" style:background-image={`url("${teamImageBase}${side.code}.png")`}>{side.code}</span>
                                <div>
                                    <a href={resolve('/[slug]', { slug: side.slug })}>{side.name}</a>
                                    <small>{side.home ? 'Domicile' : 'Extérieur'}{side.winner ? ' · Victoire' : ''}</small>
                                </div>
                                <strong>{side.score}</strong>
                            </div>
                        {/each}
                        <div class="result-footer">
                            <span>{match.venue}</span>
                            <a href={match.nhlUrl} target="_blank" rel="noreferrer">Fiche NHL ↗</a>
                        </div>
                    </article>
                {/each}
            </div>
        </section>

        <section class="home-section" aria-labelledby="teams-title">
            <div class="section-heading">
                <div>
                    <h2 id="teams-title">Découvrez les franchises</h2>
                </div>
                <a class="section-link" href={resolve('/equipes')}>Les 32 équipes →</a>
            </div>
            <div class="teams-grid">
                {#each featuredTeams as team (team.slug)}
                    <TeamCard {...team} />
                {/each}
            </div>
        </section>

        <div class="discovery-grid">
            <section class="conference-rankings" aria-labelledby="ranking-title">
                <div class="panel-heading">
                    <h2 id="ranking-title">Classements par conférence</h2>
                    <p class="section-note">Données au <time datetime={nhlMeta.standingsDate}>{nhlMeta.standingsLabel}</time> · Source NHL</p>
                </div>
                {#each conferenceRankings as conference (conference.id)}
                    <section class="ranking-panel conference-ranking" aria-labelledby={`ranking-${conference.id}`}>
                        <div class="panel-heading">
                            <h3 id={`ranking-${conference.id}`}>{conference.label}</h3>
                        </div>
                        <table>
                            <caption class="sr-only">Les huit premières équipes de la {conference.label} au {nhlMeta.standingsLabel}</caption>
                            <thead><tr><th scope="col">Rang</th><th scope="col">Équipe</th><th scope="col">Points</th></tr></thead>
                            <tbody>
                                {#each conference.rows as team (team.slug)}
                                    <tr>
                                        <td>{team.rank}</td>
                                        <th scope="row"><div class="team-entry"><span class="team-abbreviation" style:background-image={`url("${teamImageBase}${codes[team.slug]}.png")`}>{codes[team.slug]}</span><a href={resolve('/[slug]', { slug: team.slug })}>{team.name}</a></div></th>
                                        <td class="points">{team.points}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </section>
                {/each}
                <a class="panel-link" href={resolve('/classements')}>Voir tous les classements →</a>
            </section>

            <section class="quiz-panel" aria-labelledby="quiz-title">
                <img src={asset('images/quiz/global.png')} alt="Une crosse et un palet sur la glace d’une patinoire" loading="lazy" />
                <div class="quiz-content">
                    <h2 id="quiz-title">Connaissez-vous les bases de la NHL ?</h2>
                    <p>Règles, histoire et trophées : testez vos connaissances et découvrez les explications à chaque réponse.</p>
                    <div class="quiz-actions">
                        <a class="button" href={resolve('/quiz/[id]', { id: 'bases' })}>Commencer le quiz →</a>
                        <a class="section-link" href={resolve('/quiz')}>Tous les quiz</a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>

<Footer />

<style>
    .home-page, .home-page :global(*) {
        box-sizing: border-box;
    }

    .home-page {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
        overflow-x: clip;
        color: var(--text-color, #101c30);
        background: var(--bg-body, #f1f5f9);
    }

    .hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        background: #101c30;
        color: white;
    }

    .hero-content {
        align-self: center;
        padding: 64px max(32px, calc((100vw - 1280px) / 2));
        padding-right: 40px;
    }

    h1 {
        margin: 0;
        padding: 0;
        font-size: clamp(36px, 4.2vw, 64px);
        line-height: 1.08;
        text-align: left;
    }

    .hero-description {
        max-width: 480px;
        margin: 24px 0 28px;
        color: #c5d2e4;
        font-size: 19px;
        line-height: 1.6;
    }

    .hero-image {
        width: 100%;
        height: 100%;
        min-height: 420px;
        object-fit: cover;
    }

    .hero-actions, .quiz-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        color:#39bde0;
    }

    a:focus-visible {
        outline: 3px solid #39bde0;
        outline-offset: 5px;
    }

    .button {
        display: inline-block;
        padding: 14px 20px;
        border-radius: 8px;
        background: #39bde0;
        color: #101c30;
        font-weight: 700;
    }

    .button:hover {
        background: #72d4ed;
        text-decoration: none;
    }

    .hero-link {
        color: white;
        font-weight: 600;
    }

    .home-content {
        max-width: 1344px;
        margin: 0 auto;
        padding: 56px 32px 64px;
    }

    .home-section {
        margin-bottom: 56px;
    }

    .section-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
    }

    h2 {
        margin: 0;
        font-size: clamp(24px, 2.4vw, 30px);
        line-height: 1.2;
    }

    .section-heading h2 {
        padding-left: 12px;
        border-left: 4px solid #39bde0;
    }

    .section-note {
        margin: 10px 0 0;
        color: var(--muted-text, #52647c);
        font-size: 14px;
        line-height: 1.5;
    }

    .section-link, .panel-link, .result-footer a {
        color: var(--link-color, #087b9b);
        font-weight: 600;
    }

    .results-grid, .teams-grid, .discovery-grid {
        display: grid;
        gap: 24px;
    }

    .results-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .teams-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .result-card, .ranking-panel, .quiz-panel {
        min-width: 0;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--muted-text, #52647c) 18%, transparent);
        border-radius: 12px;
        background: var(--card-color, white);
        box-shadow: 0 4px 16px rgb(16 28 48 / 4%);
    }

    .result-card {
        padding: 20px;
    }

    .result-heading, .result-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        color: var(--muted-text, #52647c);
        font-size: 13px;
    }

    .result-heading {
        margin-bottom: 20px;
    }

    .result-heading time{
        font-size: 16px;
        font-weight: 600;
    }

    .status {
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 5px;
        background: var(--table-row, #f8fafc);
    }

    .result-team {
        display: grid;
        grid-template-columns: 40px minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        margin: 16px 0;
    }

    .team-abbreviation {
        display: grid;
        place-items: center;
        height: 40px;
        border-radius: 6px;
        background: #101c30;
        color: white;
        font-size: 13px;
        font-weight: 700;
        background-size: cover;
        background-position: center;
        text-shadow: 0 1px 3px rgb(0 0 0 / 70%);
    }

    .result-team a, tbody a {
        color: var(--text-color, #101c30);
        font-weight: 600;
    }

    .team-entry {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .team-entry .team-abbreviation {
        flex: none;
        width: 52px;
        height: 36px;
        font-size: 12px;
    }

    .result-team small {
        display: block;
        margin-top: 4px;
        color: var(--muted-text, #52647c);
        font-size: 12px;
    }

    .result-team strong {
        font-size: 28px;
    }

    .winner strong, .points {
        color: var(--link-color, #087b9b);
    }

    .result-footer {
        margin-top: 20px;
        padding-top: 14px;
        border-top: 1px solid var(--table-row, #f8fafc);
    }

    .result-footer span {
        font-size: 16px;
        font-weight: 600;
    }

    .discovery-grid {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }

    .conference-rankings {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
        gap: 24px;
    }

    .conference-rankings > .panel-heading,
    .conference-rankings > .panel-link {
        grid-column: 1 / -1;
    }

    .panel-heading, .quiz-content {
        padding: 28px;
    }

    .conference-ranking h3 {
        margin: 0;
        color: var(--text-color, #101c30);
        font-size: 18px;
        border-left: 4px solid var(--link-color, #39bde0);
        padding-left: 5px;
    }

    .quiz-panel {
        grid-column: 1 / -1;
        justify-self: center;
        width: 100%;
        max-width: 900px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-variant-numeric: tabular-nums;
    }

    th, td {
        padding: 16px 20px;
    }

    thead {
        background: #101c30;
        color: white;
        font-size: 13px;
    }

    tbody tr:nth-child(even) {
        background: var(--table-row, #f8fafc);
    }

    td:first-child {
        color: var(--muted-text, #52647c);
    }

    .points {
        font-weight: 800;
        text-align: center;
    }

    .panel-link {
        display: inline-block;
        margin: 24px 28px;
    }

    .quiz-panel img {
        display: block;
        width: 100%;
        height: 210px;
        object-fit: cover;
    }

    .quiz-content > p:not(.eyebrow) {
        color: var(--muted-text, #52647c);
        line-height: 1.6;
        margin: 16px 0 24px;
    }


    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }

    @media (max-width: 1050px) {
        .hero-content {
            padding: 40px 24px;
        }

        .results-grid, .discovery-grid, .conference-rankings {
            grid-template-columns: 1fr;
        }

        .conference-rankings > .panel-heading,
        .conference-rankings > .panel-link,
        .quiz-panel {
            grid-column: 1;
        }

        .teams-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 700px) {
        .hero {
            grid-template-columns: minmax(0, 1fr);
        }

        .hero-image {
            height: 240px;
            min-height: 0;
        }

        .home-content {
            padding: 32px 16px;
        }

        .home-section {
            margin-bottom: 36px;
        }

        .panel-heading, .quiz-content {
            padding: 20px;
        }

        th, td {
            padding: 14px 12px;
        }
    }

    @media (max-width: 480px) {
        .teams-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
