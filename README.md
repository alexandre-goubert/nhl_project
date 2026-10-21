# NHL Zone 🏒

Site consacré à la NHL, développé dans le cadre de ma formation
en développement web.

Ce projet personnel évolue au fil des notions que j’apprends.

## Lien du site 

https://alexandre-goubert.github.io/nhl_project

## Fonctionnalités

- Présentation des 32 franchises, regroupées par division.
- Pages dédiées aux équipes : effectif, palmarès et historique.
- Classements filtrables par ligue, conférence et division.
- Quiz interactifs pour tester ses connaissances.
- Interface adaptée aux ordinateurs, tablettes et mobiles.

## Technologies utilisées

- HTML5 : structure des pages.
- CSS3 : mise en forme, Flexbox, Grid et media queries.
- JavaScript : filtres et fonctionnement des quiz.

## Organisation du projet

nhl_project/
├── index.html
├── html/          # Autres pages du site
├── css/           # Feuilles de style
├── script/        # Fichiers JavaScript
├── images/        # Visuels du site
├── .gitignore
└── README.md

## Lancer le projet

1. Télécharger ou cloner le dépôt.
2. Ouvrir le dossier dans Visual Studio Code.
3. Lancer le fichier index.html avec l’extension Live Server.

Un serveur local permet notamment de faire fonctionner
les modules JavaScript utilisés par les quiz.

## Données et sources

- Classements : données officielles de la NHL.
- Effectifs : pages des équipes sur NHL.com.
- Palmarès et historique : Wikipédia.

Les données sont intégrées manuellement et ne sont pas
actualisées automatiquement. Certaines statistiques de
démonstration restent fictives.

## Améliorations prévues

- Actualiser les données à partir d’une API.
- Enrichir les quiz.
- Améliorer l’accessibilité et la navigation.
- Réduire la duplication du code entre les pages des équipes.

## Auteur

Alexandre Goubert — projet personnel de formation.

## À propos

Site de fans indépendant, non affilié à la NHL.

Les noms, marques et éventuels logos des équipes appartiennent
à leurs propriétaires respectifs.

## Actualisation des données NHL

Exécuter `npm run update:nhl` (ou `npm.cmd run update:nhl` sous PowerShell).
Le script utilise api-web.nhle.com sans clé et récupère les classements et les matchs
terminés de saison régulière. Les effectifs et l’historique ne sont pas actualisés.
Les pages équipes et l’accueil utilisent le même classement.

Les fichiers générés sont dans src/lib/data : rankings.json, matches.json et nhl-meta.json.
La date du classement vient de la NHL ; elle peut différer de la date de récupération.
Le script vérifie les données avant de remplacer les fichiers. Une erreur API arrête
la commande et le déploiement : le site déjà publié reste accessible.

GitHub Actions lance cette commande avant chaque publication (push sur main ou
lancement manuel du workflow). Ce n’est pas une actualisation en direct ni quotidienne.
Les données générées dans Actions ne sont pas réécrites dans le dépôt Git.
Pour actualiser également la copie locale, exécuter la commande ci-dessus.

## Mesure d'audience (Google Analytics 4)

Identifiant du flux : `G-KJ75X36E90`. La balise est chargée uniquement sur `nhlzone.com`, après acceptation dans le panneau de consentement. Le choix est conservé 180 jours. Le bouton « Confidentialité et cookies » en bas de page permet de retirer le consentement ; cela supprime les cookies GA du site et recharge la page sans Analytics.

Dans Administration → Flux de données → Web → Mesures améliorées → Pages vues → Paramètres avancés, activer les chargements de page et les changements de page basés sur les événements de l'historique. Le code n'envoie pas de `page_view` manuel : ne pas ajouter une seconde balise ou un suivi manuel en parallèle. Désactiver les mesures supplémentaires inutiles et conserver Google Signals / personnalisation publicitaire désactivés. Vérifier la durée de conservation des données dans l'administration (2 mois si cela suffit au projet).

Après déploiement, vérifier dans Temps réel / DebugView : aucune collecte avant accord ou après refus ; une page vue après accord puis une par navigation entre deux pages. Les visites locales sont exclues et les bloqueurs peuvent empêcher la collecte. La réception effective des événements doit être vérifiée dans le compte Analytics.

Le panneau décrit le fonctionnement technique. Compléter la politique de confidentialité avec l'identité et le contact du responsable, les durées effectivement configurées et les modalités d'exercice des droits avant mise en production ; ce panneau ne remplace pas cette information complète.
