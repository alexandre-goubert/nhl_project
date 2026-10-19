<script>
    import { asset } from '$app/paths';

    let { data } = $props();

    let assetBase = asset('team-style.css').replace(/team-style\.css$/, '');
    let contenu = $derived(
        data.contenu.replace(/(?:\.\.\/)+images\/([^"'\s)]+)/g, (_match, imagePath) =>
            `${assetBase}images/${imagePath}`
        )
    );
</script>

<svelte:head>
    <title>{data.equipe.nom} | NHL Zone</title>
    <meta
        name="description"
        content={`Découvrez les ${data.equipe.nom} : palmarès, effectif, localisation et historique des saisons.`}
    />
    <link rel="stylesheet" href={asset('team-style.css')} />
</svelte:head>

{@html contenu}
