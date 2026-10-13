const buttons = document.querySelectorAll('.rankings-menu button');
const rankings = document.querySelectorAll('.ranking');

// Affiche un seul tableau et indique quel bouton est sélectionné.
function afficherClassement(cible) {
    rankings.forEach(ranking => {
        ranking.hidden = ranking.id !== cible;
    });
    buttons.forEach(button => {
        button.setAttribute('aria-pressed', button.dataset.cible === cible ? 'true' : 'false');
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        afficherClassement(button.dataset.cible);
    });
});

afficherClassement('nhl');
