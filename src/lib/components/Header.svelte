<script>
import { asset, resolve } from '$app/paths';
    let theme = $state('light');
    let menuEquipesOuvert = $state(false);

    /** @param {'light' | 'dark'} nextTheme */
    function setTheme(nextTheme) {
        theme = nextTheme;
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }
</script>

<header>
    <a class="header-title" href={resolve('/')}>
        <img class="header-logo" src={asset('images/brand/nhl-zone-logo.png')} alt="NHL Zone — Accueil" width="2078" height="757" />
    </a>

    <div class="selectors-mode" aria-label="Choisir le thème">
        <button class="dark-mode-button" type="button" aria-pressed={theme === 'dark'} onclick={() => setTheme('dark')}>
            <i class="fas fa-moon" aria-hidden="true"></i>Dark
        </button>
        <button class="light-mode-button" type="button" aria-pressed={theme === 'light'} onclick={() => setTheme('light')}>
            <i class="fas fa-sun" aria-hidden="true"></i>Light
        </button>
    </div>

    <nav class="header-menu" aria-label="Navigation principale">
        <div class="header-home">
            <a href={resolve('/')}><p><i class="fas fa-home" aria-hidden="true"></i>Accueil</p></a>
        </div>
        <div class="header-teams"><button type="button" class="menu-equipes-button" aria-expanded={menuEquipesOuvert} aria-controls="menu-equipes"onclick={() => menuEquipesOuvert = !menuEquipesOuvert}>Équipes<span aria-hidden="true">▾</span></button>

    <div id="menu-equipes" class="menu-equipes" hidden={!menuEquipesOuvert}>

        <a href={resolve('/equipes')} onclick={() => menuEquipesOuvert = false}>Toutes les équipes</a>

        <a href={`${resolve('/equipes')}#atlantic`} onclick={() => menuEquipesOuvert = false}>Division Atlantique</a>

        <a href={`${resolve('/equipes')}#metropolitan`} onclick={() => menuEquipesOuvert = false}>Division Métropolitaine</a>

        <a href={`${resolve('/equipes')}#central`} onclick={() => menuEquipesOuvert = false}>Division Centrale</a>

        <a href={`${resolve('/equipes')}#pacific`} onclick={() => menuEquipesOuvert = false}>Division Pacifique</a>

    </div>
        </div>
        <div class="header-matches">
            <a href={resolve('/matchs')}><p><i class="fas fa-hockey-puck" aria-hidden="true"></i>Matchs</p></a>
        </div>
        <div class="header-rankings">
            <a href={resolve('/classements')}><p><i class="fas fa-trophy" aria-hidden="true"></i>Classements</p></a>
        </div>
        <div class="header-quiz">
            <a href={resolve('/quiz')}><p><i class="fas fa-question-circle" aria-hidden="true"></i>Quiz</p></a>
        </div>
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        background-color: #101C30;
        border-bottom: 1px solid #39BDE0;
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .header-title {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        padding: 12px 20px;
    }

    .header-logo {
        display: block;
        width: 220px;
        max-width: 100%;
        height: auto;
    }

    .header-title:focus-visible {
        outline: 3px solid #39BDE0;
        outline-offset: -4px;
    }

    .selectors-mode {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .selectors-mode {
        gap: 20px;
        padding: 20px;
    }

    .selectors-mode button {
        padding: 0;
        color: white;
        background: none;
        border: 0;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
    }

    .selectors-mode i,
    .header-menu i {
        margin-right: 10px;
    }

    .selectors-mode button[aria-pressed='true'] {
        color: #39BDE0;
    }

    .header-menu {
        display: flex;
        gap: 30px;
        padding: 20px;
        color: white;
        font-weight: 700;
    }

    .header-menu p {
        margin: 0;
    }

    .header-home:hover,
    .header-teams:hover,
    .header-matches:hover,
    .header-rankings:hover,
    .header-quiz:hover {
        color: #39BDE0;
        transition: 0.3s;
    }

    .header-menu a {
        color: white;
    }

    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        color: #39BDE0;
    }

    @media (max-width: 768px) {
        header {
            position: static;
            flex-direction: column;
            align-items: center;
        }

        .header-title {
            padding: 12px 16px;
        }

        .header-logo {
            width: 190px;
        }

        .header-menu {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            gap: 8px 18px;
            padding: 0 16px 16px;
        }

        .header-menu p {
            margin: 0;
        }
    }

    .header-teams {
        position: relative;
    }

.menu-equipes-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    border: none;
    background-color: transparent;
    color: white;
    font: inherit;
    cursor: pointer;
}

.menu-equipes {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    width: 240px;
    max-width: calc(100vw - 32px);
    padding: 8px;
    border: 1px solid #334155;
    border-radius: 10px;
    background-color: #101C30;
    box-shadow: 0 12px 30px rgb(0 0 0 / 25%);
}

.menu-equipes[hidden] {
    display: none;
}

.menu-equipes a {
    display: block;
    padding: 12px 16px;
    border-radius: 6px;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s;
}

.menu-equipes a:hover,
.menu-equipes a:focus-visible {
    background-color: #064493;
}

.menu-equipes-button:focus-visible {
    outline: 2px solid #35BDD8;
    outline-offset: 2px;
}
</style>