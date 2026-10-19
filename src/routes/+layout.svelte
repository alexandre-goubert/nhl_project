<script>
	import favicon from '#lib/assets/nhl-zone-favicon.png';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	import Header from '#lib/components/Header.svelte';
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/f6a2136e94.js" crossorigin="anonymous"></script>
	<link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<Header />
{@render children()}

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
