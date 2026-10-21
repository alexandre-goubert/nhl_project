<script>
    import { asset, resolve } from '$app/paths';

    let { data } = $props();

    let assetBase = asset('team-style.css').replace(/team-style\.css$/, '');
    let teamImageBase = asset('images/logos/TOR.png').replace(/TOR\.png$/, '');
    let contenu = $derived(
        data.contenu.replace(/(?:\.\.\/)+images\/([^"'\s)]+)/g, (_match, imagePath) =>
            `${assetBase}images/${imagePath}`
        )
    );
    let contentParts = $derived.by(() => {
        const statsNote = /<p class="team-stats-note">[\s\S]*?<\/p>/.exec(contenu);
        if (!statsNote) return [contenu, ''];
        const splitAt = statsNote.index + statsNote[0].length;
        return [contenu.slice(0, splitAt), contenu.slice(splitAt)];
    });
</script>

<svelte:head>
    <title>{data.equipe.nom} | NHL Zone</title>
    <meta
        name="description"
        content={`Découvrez les ${data.equipe.nom} : palmarès, effectif, localisation et historique des saisons.`}
    />
    <link rel="stylesheet" href={asset('team-style.css')} />
</svelte:head>

{@html contentParts[0]}

<section class="team-recent-matches" aria-labelledby="recent-matches-title">
    <h2 class="section-title" id="recent-matches-title">Les 3 derniers matchs</h2>
    {#if data.derniersMatchs.length}
        <div class="team-matches-grid">
            {#each data.derniersMatchs as match (`${match.date}-${match.teams.join('-')}`)}
                <article class="team-match-card">
                    <div class="team-match-top">
                        <time datetime={match.date}>{match.dateLabel}</time>
                        <span>{match.status}</span>
                    </div>
                    {#each match.sides as side (side.code)}
                        <div class:team-match-winner={side.winner} class="team-match-side">
                            <span
                                class="team-match-code"
                                style:background-image={`url("${teamImageBase}${side.code}.png")`}
                            >{side.code}</span>
                            <div class="team-match-identity">
                                <a href={resolve('/[slug]', { slug: side.slug })}>{side.name}</a>
                                <small>
                                    {side.home ? 'Domicile' : 'Extérieur'}
                                    {#if side.winner}<span class="team-match-winner-badge">Victoire</span>{/if}
                                </small>
                            </div>
                            <strong class="team-match-score">{side.score}</strong>
                        </div>
                    {/each}
                    <div class="team-match-bottom">
                        <span>{match.venue}</span>
                        <a href={match.nhlUrl} target="_blank" rel="noreferrer">Fiche NHL ↗</a>
                    </div>
                </article>
            {/each}
        </div>
    {:else}
        <p class="team-matches-empty">Aucun match joué cette saison.</p>
    {/if}
</section>

{@html contentParts[1]}
