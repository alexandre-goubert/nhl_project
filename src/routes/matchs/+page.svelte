<script>
    import { asset, resolve } from '$app/paths';
    import Footer from '#lib/components/Footer.svelte';
    import matches from '#lib/data/matches.json';
    import { teams } from '#lib/data/teams.js';

    const teamImageBase = asset('images/logos/TOR.png').replace(/TOR\.png$/, '');

    let dateFilter = $state('');
    let teamFilter = $state('');

    let filteredMatches = $derived(
        matches.filter(
            (match) =>
                (!dateFilter || match.date === dateFilter) &&
                (!teamFilter || match.teams.includes(teamFilter))
        )
    );
    let dates = $derived([...new Set(filteredMatches.map((match) => match.date))]);
    let dateLabels = new Map(matches.map((match) => [match.date, match.dateLabel]));
</script>

<svelte:head>
    <title>Matchs — NHL Zone</title>
    <meta name="description" content="Consultez les résultats des matchs NHL et filtrez par date ou équipe." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
    />
    <link rel="stylesheet" href={asset('legacy-style-matches.css')} />
</svelte:head>

<main class="matches-page">
    <h1>Matchs</h1>
    <div class="matches-summary">Résultats du 29 septembre au 18 octobre 2026 · Vérifiés le 19 octobre 2026</div>

    <form class="matches-filters" onsubmit={(event) => event.preventDefault()}>
        <div>
            <label for="match-date">Journée</label>
            <input id="match-date" type="date" min="2026-09-29" max="2026-10-18" bind:value={dateFilter} />
        </div>
        <div>
            <label for="match-team">Franchise</label>
            <select id="match-team" bind:value={teamFilter}>
                <option value="">Toutes les équipes</option>
                {#each [...teams].sort((a, b) => a.nom.localeCompare(b.nom, 'fr')) as team (team.slug)}
                    <option value={team.abreviation}>{team.nom}</option>
                {/each}
            </select>
        </div>
        <button type="button" onclick={() => { dateFilter = ''; teamFilter = ''; }}>Réinitialiser</button>
    </form>

    <p id="matches-count" role="status">
        {filteredMatches.length} match{filteredMatches.length === 1 ? '' : 's'} terminé{filteredMatches.length === 1 ? '' : 's'}
    </p>
    <p class="matches-note">Les rencontres les plus récentes apparaissent en premier.</p>

    <div id="matches-results">
        {#each dates as date (date)}
            <section class="match-day">
                <h2><time datetime={date}>{dateLabels.get(date)}</time></h2>
                <div class="matches-grid">
                    {#each filteredMatches.filter((match) => match.date === date) as match (`${match.date}-${match.teams.join('-')}`)}
                        <article class="match-card">
                            <div class="match-top">
                                <span class="match-status">{match.status}</span>
                                <span>Saison régulière</span>
                            </div>
                            {#each match.sides as side (side.code)}
                                <div class:winner={side.winner} class="match-team">
                                    <span
                                        class={`team-code-${side.code}`}
                                        style:background-image={`url("${teamImageBase}${side.code}.png")`}
                                    >{side.code}</span>
                                    <div>
                                        <a href={resolve('/[slug]', { slug: side.slug })}>{side.name}</a>
                                        <small>
                                            {side.home ? 'Domicile' : 'Extérieur'}
                                            {#if side.winner}<span class="winner-badge">Victoire</span>{/if}
                                        </small>
                                    </div>
                                    <strong class="match-score">{side.score}</strong>
                                </div>
                            {/each}
                            <div class="match-bottom">
                                <span>{match.venue}</span>
                                <a href={match.nhlUrl} target="_blank" rel="noreferrer">Fiche NHL ↗</a>
                            </div>
                        </article>
                    {/each}
                </div>
            </section>
        {/each}
    </div>

    {#if filteredMatches.length === 0}
        <p class="matches-empty" role="status">Aucun match ne correspond à ces filtres.</p>
    {/if}
    <p class="matches-note">Résultats statiques issus du projet NHL Zone ; ils ne sont pas actualisés automatiquement.</p>
</main>

<Footer />

<style>
    .matches-page {
        min-height: 70vh;
    }

    .matches-empty {
        margin: 32px auto;
        padding: 24px;
        text-align: center;
        background: var(--card-color, white);
        border-radius: 10px;
    }
</style>
