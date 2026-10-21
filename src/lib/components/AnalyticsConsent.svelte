<script>
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import { consentKey, readConsent, saveConsent, startAnalytics, stopAnalytics } from '#lib/analytics.js';

    let visible = $state(false);
    let accepted = $state(false);

    /** @param {boolean} choice */
    function choose(choice) {
        const wasAccepted = accepted;
        saveConsent(choice);
        accepted = choice;
        visible = false;
        if (choice) startAnalytics();
        else if (wasAccepted) stopAnalytics();
    }

    onMount(() => {
        const choice = readConsent();
        accepted = choice === true;
        visible = choice === null;
        if (accepted) startAnalytics();
        const expiryCheck = window.setInterval(() => {
            if (readConsent() === null && accepted) stopAnalytics();
        }, 60000);
        /** @param {StorageEvent} event */
        function sync(event) {
            if (event.key === consentKey || event.key === null) location.reload();
        }
        window.addEventListener('storage', sync);
        return () => {
            clearInterval(expiryCheck);
            window.removeEventListener('storage', sync);
        };
    });
</script>

<div class="privacy-settings">
    <a href={resolve('/confidentialite')}>Politique de confidentialité</a>
    <button type="button" onclick={() => visible = true} aria-expanded={visible} aria-controls="analytics-choice">
        Confidentialité et cookies
    </button>
</div>

{#if visible}
    <section id="analytics-choice" class="consent" aria-labelledby="consent-title">
        <h2 id="consent-title">Mesure d’audience</h2>
        <p>Avec votre accord, NHL Zone utilise Google Analytics pour comprendre quelles pages sont consultées et améliorer le site. Vous pouvez refuser sans limiter votre navigation.</p>
        <p><a href={resolve('/confidentialite')}>Lire notre politique de confidentialité</a></p>
        <details>
            <summary>En savoir plus sur vos données</summary>
            <p>Après acceptation, Google reçoit des informations de navigation (pages consultées, interactions, appareil et provenance des visites) et utilise des cookies pour mesurer l’audience. Aucun suivi Analytics n’est chargé avant votre accord. Les fonctionnalités publicitaires ne sont pas activées par notre intégration.</p>
            <p>Votre choix est mémorisé dans ce navigateur pendant 180 jours. Vous pouvez retirer votre accord à tout moment avec « Confidentialité et cookies ». Le retrait arrête les prochaines collectes et supprime les cookies Analytics de ce site ; il n’efface pas les données déjà transmises.</p>
            <p><a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noreferrer">Politique de confidentialité de Google</a></p>
        </details>
        <div class="choices">
            <button type="button" onclick={() => choose(false)}>Refuser</button>
            <button type="button" onclick={() => choose(true)}>Accepter</button>
        </div>
    </section>
{/if}

<style>
    .privacy-settings { padding: 12px; text-align: center; background: #101c30; }
    .privacy-settings button { color: white; background: transparent; border: 0; text-decoration: underline; cursor: pointer; font: inherit; }
    .consent { position: fixed; z-index: 1000; bottom: 16px; left: 16px; right: 16px; max-width: 640px; max-height: 80vh; overflow-y: auto; box-sizing: border-box; padding: 24px; background: #101c30; color: #fff; border: 1px solid #39bde0; border-radius: 12px; box-shadow: 0 8px 32px #0005; font-size: 16px; line-height: 1.5; }
    h2 { margin: 0 0 8px; font-size: 22px; }
    p { margin: 8px 0; }
    summary { cursor: pointer; }
    a { color: #67d7f3; }
    .choices { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
    .choices button { flex: 1; padding: 12px 20px; border: 1px solid #39bde0; border-radius: 8px; background: #173753; color: white; font: inherit; cursor: pointer; }
    .choices button:hover { background: #245475; }
    button:focus-visible, summary:focus-visible, a:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
</style>
