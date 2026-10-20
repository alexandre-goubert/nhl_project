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
