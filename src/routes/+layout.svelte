<script>
    import { onNavigate } from '$app/navigation';
    import { asset } from '$app/paths';
    import AnalyticsConsent from '#lib/components/AnalyticsConsent.svelte';
    import '#lib/theme.css';

    // Attend le CSS des pages héritées avant d'afficher leur contenu.
    const pageStyles = new Map([
        ['/[slug]', asset('team-style.css')],
        ['/matchs', asset('legacy-style-matches.css')],
        ['/classements', asset('legacy-style-rankings.css')],
        ['/quiz', asset('legacy-style-quiz.css')],
        ['/quiz/[id]', asset('legacy-style-quiz.css')]
    ]);

    onNavigate(({ to }) => {
        const href = pageStyles.get(to?.route.id ?? '');
        if (!href) return;

        const url = new URL(href, document.baseURI).href;
        const alreadyLoaded = Array.from(document.styleSheets).some((sheet) => sheet.href === url);
        if (alreadyLoaded) return;

        return new Promise((resolve) => {
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = href;
            // Télécharge le fichier sans modifier la page encore affichée.
            stylesheet.media = 'not all';

            const finish = () => {
                clearTimeout(timeout);
                stylesheet.onload = null;
                stylesheet.onerror = null;
                stylesheet.media = 'all';
                // Svelte ajoute ensuite le lien normal dans le head de la nouvelle page.
                resolve(() => stylesheet.remove());
            };

            const timeout = setTimeout(finish, 8000);
            stylesheet.onload = finish;
            stylesheet.onerror = finish;
            document.head.appendChild(stylesheet);
        });
    });

	import favicon from '#lib/assets/nhl-zone-favicon.png';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	import Header from '#lib/components/Header.svelte';
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&amp;family=Graduate&amp;display=swap" rel="stylesheet" />
	<script src="https://kit.fontawesome.com/f6a2136e94.js" crossorigin="anonymous"></script>
	<link rel="icon" type="image/png" href={favicon} />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
</svelte:head>

<Header />
{@render children()}
<AnalyticsConsent />

<style>
	:global(html) {
		--bg-color-dark: #0b1220;
		--bg-color-light: #f1f5f9;
		--bg-body-light: #f1f5f9;
		--text-color: #101c30;
		--card-color-dark: #1c3052;
		--bg-color: var(--bg-color-light);
		--bg-body: var(--bg-body-light);
		--description-text: #000;
		--card-color: #fff;
		--muted-text: #52647c;
		--table-row: #f8fafc;
		--link-color: #087b9b;
	}

	:global(body) {
		margin: 0;
		background-color: var(--bg-body);
		color: var(--text-color);
		font-family: 'Barlow', sans-serif;
	}

	:global(body.dark-mode) {
		--bg-color: var(--bg-color-dark);
		--bg-body: var(--bg-color-dark);
		--description-text: #f1f5f9;
		--text-color: #fff;
		--card-color: var(--card-color-dark);
		--muted-text: #c1ccda;
		--table-row: #24344c;
		--link-color: #39bde0;
		color: #fff;
		background-color: var(--bg-body);
	}
</style>
