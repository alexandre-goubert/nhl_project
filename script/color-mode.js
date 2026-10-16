const darkMode = document.querySelector('.selectors-mode .dark-mode');
const lightMode = document.querySelector('.selectors-mode .light-mode');

darkMode.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
});

lightMode.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
});