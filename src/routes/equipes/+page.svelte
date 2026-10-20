<script>
    import Footer from '#lib/components/Footer.svelte';
    import TeamCard from '#lib/components/TeamCard.svelte';
    import { teams } from '#lib/data/teams.js';

    const divisions = [
        { id: 'atlantic', nom: 'Atlantic', conference: 'Est' },
        { id: 'metropolitan', nom: 'Metropolitan', conference: 'Est' },
        { id: 'central', nom: ' Central', conference: 'Ouest' },
        { id: 'pacific', nom: 'Pacific', conference: 'Ouest' }
    ];

    let filteredTeams = $state(teams);
</script>

<svelte:head>
    <title>Les équipes — NHL Zone</title>
    <meta name="description" content="Découvre les 32 franchises NHL, regroupées par division et conférence." />
</svelte:head>

<main class="teams-page">
    <h1>Les équipes de la NHL</h1>
    <nav class="divisions-menu" aria-label="Aller à une division">
        {#each divisions as division (division.id)}
            {@const divisionTeams = filteredTeams.filter(team => team.division === division.id)}
            {#if divisionTeams.length > 0}
                <a href={`#${division.id}`}>{division.nom} Division</a>
            {/if}
        {/each}
        <input type="text" placeholder="Rechercher une équipe..." oninput={(event) => { const query = event.currentTarget.value.toLowerCase(); filteredTeams = teams.filter(team => team.nom.toLowerCase().includes(query)); }} />
    </nav>

    {#if filteredTeams.length === 0}
        <p class="no-results" role="status">Aucune équipe ne correspond à votre recherche.</p>
    {/if}

    {#each divisions as division (division.id)}
        {@const divisionTeams = filteredTeams.filter(team => team.division === division.id)}
        {#if divisionTeams.length > 0}
            <section id={division.id} aria-labelledby={`titre-${division.id}`}>
                <div class="division-title">
                    <h2 id={`titre-${division.id}`}>Division {division.nom}</h2>
                    <span>Conférence {division.conference}</span>
                </div>

                <div class="teams-grid">
                    {#each divisionTeams as team (team.slug)}
                        <TeamCard
                            nom={team.nom}
                            abreviation={team.abreviation}
                            ville={team.ville}
                            couleur={team.couleur}
                            image={team.image}
                            slug={team.slug}
                        />
                    {/each}
                </div>
            </section>
        {/if}
    {/each}
</main>

<Footer />

<style>
    .teams-page {
        padding: 48px 24px;
        background: var(--bg-body, #F1F5F9);
        color: var(--text-color, #101C30);
        font-family: 'Barlow', sans-serif;
    }

    h1 {
        margin: 0;
        text-align: center;
        font-size: clamp(32px, 5vw, 56px);
    }

    .divisions-menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin: 48px;
    }

    .no-results {
        margin: 0 0 48px;
        text-align: center;
    }

    .divisions-menu a {
        padding: 12px 16px;
        color: #087DA0;
        background: var(--card-color, white);
        border: 1px solid #39BDE0;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
    }

    .divisions-menu a:hover {
        color: #101C30;
        background: #39BDE0;
    }

    .divisions-menu a:focus-visible {
        outline: 3px solid #087DA0;
        outline-offset: 4px;
    }
    input {
        padding: 8px 12px;
        border: 1px solid #39BDE0;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Barlow', sans-serif;
        color:#087DA0
    }
    input:focus {
        outline: 3px solid #087DA0;
        outline-offset: 4px;
    }
    input::placeholder {
        color: #087DA0;
        opacity: 0.7;
        font-style: italic;
    }

    section {
        max-width: 1280px;
        margin: 0 auto 48px;
        scroll-margin-top: 24px;
    }

    .division-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
    }

    h2 {
        margin: 0;
        padding-left: 12px;
        border-left: 4px solid #39BDE0;
        font-size: 24px;
    }

    .division-title span {
        padding: 8px 12px;
        color: var(--text-color, #101C30);
        background: var(--card-color, white);
        border: 1px solid #39BDE0;
        border-radius: 8px;
        font-size: 14px;
    }

    .teams-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 24px;
    }

    @media (max-width: 1000px) {
        .teams-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 540px) {
        .teams-page {
            padding: 32px 16px;
        }

        .teams-grid {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
