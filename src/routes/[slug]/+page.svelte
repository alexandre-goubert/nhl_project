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

    const site = 'https://nhlzone.com';
    let url = $derived(`${site}/${encodeURIComponent(data.equipe.slug)}/`);
    let logo = $derived(`${site}/images/logos/${data.equipe.abreviation}.png`);
    let title = $derived(`${data.equipe.nom} | NHL Zone`);
    let description = $derived(
        `Découvrez les ${data.equipe.nom} (${data.equipe.ville}), équipe de la division ${data.equipe.division} en conférence ${data.equipe.conference} : palmarès, effectif, classement et derniers matchs.`
    );
    let jsonLd = $derived(
        JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsTeam',
            name: data.equipe.nom,
            sport: 'Ice hockey',
            url,
            logo,
            location: data.equipe.ville,
            memberOf: { '@type': 'SportsOrganization', name: 'National Hockey League' }
        }).replace(/</g, '\\u003c')
    );
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NHL Zone" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={logo} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={logo} />
    {@html `<script type="application/ld+json">${jsonLd}</script>`}
    <link rel="stylesheet" href={asset('team-style.css')} />
</svelte:head>

{@html contentParts[0]}

<section class="team-recent-matches" aria-labelledby="recent-matches-title">
    <h2 class="section-title" id="recent-matches-title">Les 3 derniers matchs</h2>
    {#if data.derniersMatchs.length}
        <div class="results-grid">
            {#each data.derniersMatchs as match (match.nhlUrl)}
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
    {:else}
        <p class="team-matches-empty">Aucun match joué cette saison.</p>
    {/if}
</section>

{@html contentParts[1]}
