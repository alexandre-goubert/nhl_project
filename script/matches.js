const filters = document.querySelector('#matches-filters');
const dateInput = document.querySelector('#match-date');
const teamInput = document.querySelector('#match-team');
const cards = document.querySelectorAll('.match-card');
const days = document.querySelectorAll('.match-day');
const count = document.querySelector('#matches-count');
const empty = document.querySelector('#matches-empty');

function filtrerMatchs() {
    let total = 0;

    cards.forEach(card => {
        const bonneDate = !dateInput.value || card.dataset.date === dateInput.value;
        const bonneEquipe = !teamInput.value || card.dataset.teams.split(' ').includes(teamInput.value);

        card.hidden = !(bonneDate && bonneEquipe);
        if (!card.hidden) total++;
    });

    days.forEach(day => {
        day.hidden = !day.querySelector('.match-card:not([hidden])');
    });

    count.textContent = `${total} match${total > 1 ? 's' : ''} terminé${total > 1 ? 's' : ''}`;
    empty.hidden = total !== 0;
}

filters.hidden = false;
filters.addEventListener('submit', event => event.preventDefault());
dateInput.addEventListener('input', filtrerMatchs);
teamInput.addEventListener('change', filtrerMatchs);
filters.addEventListener('reset', () => {
    dateInput.value = '';
    teamInput.value = '';
    filtrerMatchs();
});

filtrerMatchs();
