<script>
    import details from '#lib/data/franchise-details.json';

    /** @type {{ franchise: (typeof details.teams)[keyof typeof details.teams] }} */
    let { franchise } = $props();
</script>

<div class="franchise-details">
    <section class="franchise-panel" aria-labelledby="franchise-history-title">
        
        <h2 id="franchise-history-title">Historique de la franchise</h2>
        <ol class="franchise-timeline">
            {#each franchise.history as era}
                <li class:current={era.end === null}>
                    <span class="era-dates">{era.start} – {era.end ?? 'aujourd’hui'}</span>
                    <h3>{era.name}</h3>
                </li>
            {/each}
        </ol>
        {#if franchise.note}<p class="history-note">{franchise.note}</p>{/if}
        <a class="source-link" href={franchise.historySource} target="_blank" rel="noreferrer">Historique sur Wikipédia ↗</a>
        {#if 'additionalSource' in franchise}
            <a class="source-link" href={franchise.additionalSource} target="_blank" rel="noreferrer">Précisions de la NHL ↗</a>
        {/if}
    </section>

    <section class="franchise-panel" aria-labelledby="affiliates-title">

        <h2 id="affiliates-title">Clubs affiliés</h2>
        <p class="affiliates-season">Saison {details.season}</p>
        <dl class="affiliates-list">
            <div>
                <dt><span class="league-badge">AHL</span><span>American Hockey League</span></dt>
                <dd>{franchise.ahl}</dd>
            </div>
            <div>
                <dt><span class="league-badge">ECHL</span><span>ECHL</span></dt>
                <dd>{franchise.echl ?? 'Aucun affilié'}</dd>
            </div>
        </dl>
        
        <div class="affiliate-sources">
            <a class="source-link" href={details.ahlSource} target="_blank" rel="noreferrer">Annuaire AHL ↗</a>
            <a class="source-link" href={details.echlSource} target="_blank" rel="noreferrer">Annuaire ECHL ↗</a>
        </div>
    </section>
</div>

<style>
    .franchise-details {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        margin: 32px 0 40px;
    }

    .franchise-panel {
        min-width: 0;
        padding: 28px;
        border: 1px solid var(--border-color, #d6e0eb);
        border-radius: 14px;
        background: var(--card-color, #fff);
        color: var(--text-color, #101c30);
        box-shadow: 0 6px 20px rgb(0 0 0 / 6%);
    }

    .franchise-panel h2 {
        margin: 0 0 24px;
        font-size: 26px;
        line-height: 1.2;
    }

    .franchise-timeline {
        margin: 0 0 24px 6px;
        padding: 0 0 0 22px;
        border-left: 2px solid var(--border-color, #d6e0eb);
        list-style: none;
    }

    .franchise-timeline li {
        position: relative;
        padding: 0 0 24px;
    }

    .franchise-timeline li:last-child {
        padding-bottom: 0;
    }

    .franchise-timeline li::before {
        position: absolute;
        top: 5px;
        left: -29px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--muted-text, #52647c);
        content: '';
    }

    .franchise-timeline li.current::before {
        background: #39bde0;
        box-shadow: 0 0 0 4px rgb(57 189 224 / 16%);
    }

    .era-dates,
    .affiliates-season,
    .history-note,
    .affiliates-list dt {
        color: var(--muted-text, #52647c);
        line-height: 1.6;
    }

    .franchise-timeline h3 {
        margin: 4px 0 0;
        font-size: 20px;
        overflow-wrap: anywhere;
    }

    .affiliates-season {
        margin: -12px 0 20px;
    }

    .affiliates-list {
        display: grid;
        gap: 16px;
        margin: 0 0 20px;
    }

    .affiliates-list > div {
        padding: 18px;
        border-radius: 10px;
        background: var(--table-row, #f8fafc);
    }

    .affiliates-list dt {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 13px;
    }

    .league-badge {
        padding: 3px 9px;
        border-radius: 5px;
        background: #101c30;
        color: #fff;
        font-weight: 700;
    }

    .affiliates-list dd {
        margin: 12px 0 0;
        font-size: 20px;
        font-weight: 700;
        overflow-wrap: anywhere;
    }

    .history-note {
        font-size: 14px;
    }

    .affiliate-sources {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 20px;
    }

    .source-link {
        display: inline-block;
        margin-top: 8px;
        color: var(--link-color, #087b9b);
        font-size: 14px;
        font-weight: 600;
        text-underline-offset: 4px;
    }

    .source-link:hover {
        text-decoration: underline;
    }

    @media (max-width: 800px) {
        .franchise-details {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
        }

        .franchise-panel {
            padding: 22px;
        }
    }
</style>
