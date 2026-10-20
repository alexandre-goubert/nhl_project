import { teams } from '#lib/data/teams.js';
import { quizDisponibles } from '#lib/data/quiz-questions.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
    const site = 'https://nhlzone.com';
    const pages = [
        '/',
        '/equipes/',
        '/matchs/',
        '/classements/',
        '/quiz/',
        ...teams.map((team) => `/${encodeURIComponent(team.slug)}/`),
        ...Object.keys(quizDisponibles).map((id) => `/quiz/${encodeURIComponent(id)}/`)
    ];

    const urls = [...new Set(pages)]
        .map((page) => `    <url><loc>${site}${page}</loc></url>`)
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        }
    });
}
