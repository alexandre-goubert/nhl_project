<script>
    import Footer from '#lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Politique de confidentialité — NHL Zone</title>
    <meta name="description" content="Comment NHL Zone utilise vos données, mesure son audience et vous permet de gérer vos choix de confidentialité." />
    <link rel="canonical" href="https://nhlzone.com/confidentialite/" />
</svelte:head>

<main class="privacy-page">
    <h1>Politique de confidentialité</h1>
    <p class="updated">Mise à jour le 21 octobre 2026</p>

    <section>
        <h2>Responsable et contact</h2>
        <p>Alexandre Goubert est responsable des traitements de données mis en œuvre pour NHL Zone, site de fans indépendant et non affilié à la NHL.</p>
        <p>Pour toute question ou demande relative à vos données : <a href="mailto:infocontactnhlzone@gmail.com">infocontactnhlzone@gmail.com</a>.</p>
    </section>

    <section>
        <h2>Mesure d’audience avec Google Analytics</h2>
        <p>Avec votre consentement, NHL Zone utilise Google Analytics 4 pour mesurer la fréquentation, comprendre quelles pages sont consultées et améliorer le site. Accepter est facultatif : refuser ne limite pas l’accès aux contenus.</p>
        <p>Les données peuvent comprendre les pages et interactions mesurées, la date des visites, leur provenance, des informations sur le navigateur et l’appareil, une localisation approximative et des identifiants de cookies. Google indique que GA4 ne conserve pas les adresses IP individuelles.</p>
        <p>Ces informations sont accessibles au responsable du site et traitées par Google pour fournir le service Analytics. Notre intégration désactive Google Signals et les signaux de personnalisation publicitaire.</p>
        <p>La base légale de cette mesure d’audience est votre consentement. La balise Analytics n’est pas chargée avant votre acceptation ni après un refus.</p>
    </section>

    <section>
        <h2>Durées de conservation et choix des cookies</h2>
        <p>La durée choisie dans Google Analytics pour les données détaillées au niveau des utilisateurs et des événements est de <strong>deux mois</strong>. Ce réglage ne s’applique pas aux rapports statistiques agrégés, qui peuvent rester disponibles au-delà.</p>
        <p>Votre choix d’accepter ou de refuser est mémorisé pendant <strong>180 jours</strong> dans le stockage local de votre navigateur, sous la clé <code>nhlzone-analytics-consent-v1</code>. Ce stockage sert uniquement à respecter votre préférence.</p>
        <p>Après acceptation, les cookies Analytics <code>_ga</code> et <code>_ga_KJ75X36E90</code> permettent de distinguer les visiteurs et de maintenir les informations de session. Notre intégration fixe leur durée à 180 jours, sans renouvellement automatique à chaque visite. La durée des cookies est distincte de celle des données dans Analytics.</p>
        <p>Vous pouvez modifier votre choix à tout moment avec le bouton <strong>« Confidentialité et cookies »</strong> en bas de chaque page. Retirer votre accord arrête les prochaines collectes et supprime les cookies Analytics du site dans ce navigateur. Ce retrait n’annule pas la licéité du traitement antérieur et ne supprime pas automatiquement les données déjà transmises.</p>
    </section>

    <section>
        <h2>Hébergement et ressources externes</h2>
        <p>Le site est hébergé sur GitHub Pages. GitHub indique enregistrer les adresses IP des visiteurs à des fins de sécurité. Ces traitements techniques sont distincts de la mesure d’audience et nécessaires à la fourniture et à la protection du service.</p>
        <p>Le site charge également des polices depuis Google Fonts et des icônes depuis Font Awesome. Ces requêtes peuvent communiquer aux fournisseurs votre adresse IP et des informations techniques sur votre navigateur, même si vous refusez Analytics. Leur finalité est l’affichage du site ; NHL Zone s’appuie sur son intérêt légitime à fournir un site fonctionnel et lisible pour ces ressources techniques.</p>
        <p>Les durées appliquées aux journaux de ces prestataires dépendent de leurs politiques respectives. Consultez les <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">règles de confidentialité de GitHub</a>, les <a href="https://policies.google.com/privacy?hl=fr">règles de Google</a> et la <a href="https://fontawesome.com/privacy">politique de Font Awesome</a>.</p>
    </section>

    <section>
        <h2>Messages envoyés par e-mail</h2>
        <p>Si vous nous contactez, votre adresse e-mail, le contenu du message et les éventuelles pièces jointes sont utilisés pour vous répondre et traiter votre demande. Ce traitement repose sur notre intérêt légitime à répondre aux visiteurs ou sur nos obligations légales pour les demandes d’exercice de droits.</p>
        <p>Les échanges sont accessibles au responsable du site et au prestataire de messagerie Gmail. Ils sont conservés pendant le temps nécessaire au traitement et au suivi de la demande, puis supprimés, sauf obligation légale ou nécessité de conserver une preuve en cas de litige.</p>
    </section>

    <section>
        <h2>Traitements hors de l’Espace économique européen</h2>
        <p>Les prestataires cités peuvent traiter des données dans d’autres pays, notamment aux États-Unis. Selon le service et la destination, ils décrivent le recours à des décisions d’adéquation, au cadre de protection des données UE–États-Unis pour les organismes certifiés ou à des clauses contractuelles types.</p>
        <p>Les garanties sont détaillées dans leurs politiques ci-dessus et dans les <a href="https://policies.google.com/privacy/frameworks?hl=fr">informations de Google sur les transferts internationaux</a>. Vous pouvez nous contacter pour obtenir des précisions sur les garanties applicables.</p>
    </section>

    <section>
        <h2>Vos droits</h2>
        <p>Dans les conditions prévues par le RGPD, vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du traitement de vos données, ainsi que leur portabilité lorsque ce droit s’applique. Vous pouvez vous opposer aux traitements fondés sur l’intérêt légitime et retirer votre consentement à la mesure d’audience à tout moment.</p>
        <p>Écrivez à <a href="mailto:infocontactnhlzone@gmail.com">infocontactnhlzone@gmail.com</a>. Nous répondons en principe sous un mois ; ce délai peut être prolongé dans les conditions légales. Des précisions peuvent être nécessaires pour identifier les données concernées, car une visite du site n’est pas directement associée à votre nom.</p>
        <p>Vous pouvez également déposer une réclamation auprès de la <a href="https://www.cnil.fr/fr/adresser-une-plainte">Commission nationale de l’informatique et des libertés (CNIL)</a>.</p>
    </section>
</main>

<Footer />

<style>
    .privacy-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 48px 24px;
        color: var(--text-color, #101c30);
        line-height: 1.7;
    }

    h1 { font-size: clamp(28px, 5vw, 42px); line-height: 1.2; }
    h2 { font-size: 24px; line-height: 1.3; }
    section { margin-top: 32px; }
    a { color: inherit; text-decoration: underline; text-underline-offset: 3px; overflow-wrap: anywhere; }
    a:focus-visible { outline: 3px solid #39bde0; outline-offset: 3px; }
    code { overflow-wrap: anywhere; }
    .updated { font-size: 15px; }
</style>
