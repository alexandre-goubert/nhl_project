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

    const contenu = await loadPage();

    if (typeof contenu !== 'string') {
        error(500, `La page source de ${equipe.nom} est invalide.`);
    }

    return { equipe, contenu };
}
