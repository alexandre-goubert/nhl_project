<script>
    import { asset, resolve } from '$app/paths';

    let { nom, abreviation, ville, couleur, image, slug } = $props();
</script>

<article class="team-card">
    <div
        class="team-visual"
        style:background-color={couleur}
        style:background-image={`url("${asset(image.startsWith('/') ? image.slice(1) : image)}")`}
    >
        <span>{abreviation}</span>
    </div>

    <div class="team-info">
        <h3>{nom}</h3>
        <p>{ville}</p>
        <a class="view-team" href={resolve('/[slug]', { slug })}>
            Voir l’équipe →
        </a>
    </div>
</article>

<style>
    .team-card {
        height: 100%;
        overflow: hidden;
        background-color: var(--card-color, white);
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        transition: box-shadow 0.3s;
    }

    .team-card:hover {
        box-shadow: 0 6px 20px rgb(16 28 48 / 20%);
    }

    .team-visual {
        display: grid;
        place-items: center;
        min-height: 160px;
        background-size: cover;
        background-position: center;
        color: white;
        font-size: 56px;
        font-weight: 800;
        text-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }

    .team-info {
        padding: 20px;
    }

    .view-team {
        display: inline-block;
        margin-top: 16px;
        color: var(--link-color, #087b9b);
        font-weight: 600;
        text-decoration: none;
    }

    .view-team:hover {
        text-decoration: underline;
    }

    h3 {
        margin: 0 0 10px;
        color: var(--text-color, #101C30);
        font-size: 20px;
    }

    p {
        margin: 0;
        color: var(--muted-text, #52647C);
        font-size: 14px;
        line-height: 1.5;
    }

    @media (prefers-reduced-motion: reduce) {
        .team-card {
            transition: none;
        }
    }
</style>
