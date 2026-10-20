<script>
    import nhlMeta from '#lib/data/nhl-meta.json';
    import { asset, resolve } from '$app/paths';
    import Footer from '#lib/components/Footer.svelte';
    import standings from '#lib/data/rankings.json';

    /** @type {{ id: 'nhl' | 'eastern' | 'western' | 'atlantic' | 'metropolitan' | 'central' | 'pacific', label: string }[]} */
    const categories = [
        { id: 'nhl', label: 'NHL' },
        { id: 'eastern', label: 'Conférence Est' },
        { id: 'western', label: 'Conférence Ouest' },
        { id: 'atlantic', label: 'Atlantic' },
        { id: 'metropolitan', label: 'Metropolitan' },
        { id: 'central', label: 'Central' },
        { id: 'pacific', label: 'Pacific' }
    ];
    const divisionIds = new Set(['atlantic', 'metropolitan', 'central', 'pacific']);
    /** @type {'nhl' | 'eastern' | 'western' | 'atlantic' | 'metropolitan' | 'central' | 'pacific'} */
    let selected = $state('nhl');
    let ranking = $derived(standings[selected]);
</script>

<svelte:head>
    <title>Classements — NHL Zone</title>
    <meta name="description" content="Consultez les classements NHL par ligue, conférence et division." />
    <link rel="stylesheet" href={asset('legacy-style-rankings.css')} />
</svelte:head>

<main class="standings-page">
    <h1>Classements</h1>
    <p class="standings-meta">Saison {nhlMeta.seasonLabel} · Données au {nhlMeta.standingsLabel}</p>
    <nav class="rankings-menu" aria-label="Choisir un classement">
        <div class="rankings-filter-group">
            {#each categories.slice(0, 3) as category (category.id)}
                <button
                    type="button"
                    aria-controls="ranking-table"
                    aria-pressed={selected === category.id}
                    onclick={() => (selected = category.id)}
                >{category.label}</button>
            {/each}
        </div>
        <div class="rankings-filter-group">
            {#each categories.slice(3) as category (category.id)}
                <button
                    type="button"
                    aria-controls="ranking-table"
                    aria-pressed={selected === category.id}
                    onclick={() => (selected = category.id)}
                >{category.label}</button>
            {/each}
        </div>
    </nav>

    <section
        id="ranking-table"
        class="ranking"
        data-division={divisionIds.has(selected) ? '' : undefined}
        aria-live="polite"
        aria-label={ranking.title}
    >
        <table>
            <caption>{ranking.title}</caption>
            <thead>
                <tr>
                    <th scope="col">R</th>
                    <th scope="col">Équipe</th>
                    <th scope="col">G</th>
                    <th scope="col">W</th>
                    <th scope="col">L</th>
                    <th scope="col">OT</th>
                    <th scope="col">PTS</th>
                    <th scope="col">Streak</th>
                </tr>
            </thead>
            <tbody>
                {#each ranking.rows as row (row.slug)}
                    <tr>
                        <td>{row.rank}</td>
                        <td><a href={resolve('/[slug]', { slug: row.slug })}>{row.name}</a></td>
                        <td>{row.gp}</td>
                        <td>{row.wins}</td>
                        <td>{row.losses}</td>
                        <td>{row.ot}</td>
                        <td>{row.points}</td>
                        <td>
                            <span
                                class:streak-win={row.streak.startsWith('W')}
                                class:streak-loss={row.streak.startsWith('L')}
                                class:streak-ot={row.streak.startsWith('OT')}
                                class="streak"
                            >{row.streak}</span>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>
    <p class="standings-meta">
        Source : <a href={nhlMeta.standingsSource}>classement NHL au {nhlMeta.standingsLabel}</a>.
        Actualisées lors de la dernière synchronisation avec la NHL.
    </p>
    <p class ="standings-explain">
        <span><strong>G</strong> : Nombre de matchs joués</span>
        <span><strong>W</strong> : Victoires</span>
        <span><strong>L</strong> : Défaites</span>
        <span><strong>OT</strong> : Défaites en prolongation</span>
        <span><strong>PTS</strong> : Points</span>
        <span><strong>Streak</strong> : Série en cours</span>
    </p>
    <p class="standings-note">
        <span><strong>Note</strong> : Les 3 premières équipes de chaque division sont qualifiées pour les séries éliminatoires.</span>
    </p>
</main>

<Footer />

<style>
    :global(body.dark-mode) .ranking {
        background: #1c3052;
        border-color: #2f4a75;
    }

    :global(body.dark-mode) .ranking table,
    :global(body.dark-mode) .ranking caption,
    :global(body.dark-mode) .ranking td,
    :global(body.dark-mode) .ranking a {
        color: #f1f5f9;
    }

    :global(body.dark-mode) .ranking td {
        border-bottom-color: #2f4a75;
    }

    :global(body.dark-mode) .ranking tbody tr:nth-child(odd) {
        background: #1c3052;
    }

    :global(body.dark-mode) .ranking tbody tr:nth-child(even) {
        background: #24344c;
    }

    :global(body.dark-mode) .ranking tbody tr:hover {
        background: #2f4a75;
    }

    :global(body.dark-mode) .ranking tbody td:first-child {
        color: #c1ccda;
    }

    :global(body.dark-mode) .ranking tbody td:nth-child(7) {
        color: #39bde0;
    }

    :global(body.dark-mode) .ranking a:hover {
        color: #39bde0;
    }

    :global(body.dark-mode) .rankings-menu button {
        color: #f1f5f9;
        background: #1c3052;
        border-color: #2f4a75;
    }

    :global(body.dark-mode) .rankings-menu button[aria-pressed='true'],
    :global(body.dark-mode) .rankings-menu button:hover {
        color: #101c30;
        background: #39bde0;
        border-color: #39bde0;
    }
</style>
