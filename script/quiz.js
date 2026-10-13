import { quizDisponibles } from "./questions.js";


// Éléments de la page

const titre = document.querySelector("#quiz-title");
const description = document.querySelector("#quiz-description");
const contenu = document.querySelector("#quiz-content");

const compteur = document.querySelector("#question-counter");
const progression = document.querySelector("#quiz-progress");
const questionTitre = document.querySelector("#question-title");
const reponses = document.querySelectorAll(".answer");
const correction = document.querySelector("#quiz-feedback");

const boutonValider = document.querySelector("#validate-answer");
const boutonSuivant = document.querySelector("#next-question");

const resultat = document.querySelector("#quiz-result");
const scoreFinal = document.querySelector("#final-score");
const boutonRejouer = document.querySelector("#restart-quiz");


// Quiz choisi dans l'adresse : jouer.html?quiz=bases

const parametres = new URLSearchParams(window.location.search);
const identifiant = parametres.get("quiz") || "bases";

const quiz = Object.hasOwn(quizDisponibles, identifiant)
    ? quizDisponibles[identifiant]
    : null;


// État de la partie

let indexQuestion = 0;
let reponseChoisie = null;
let questionValidee = false;
let score = 0;


// Afficher la question et remettre les boutons à zéro

function afficherQuestion() {
    const question = quiz.questions[indexQuestion];
    reponseChoisie = null;                                          
    questionValidee = false;

    questionTitre.textContent = question.question;

    compteur.textContent =
        `Question ${indexQuestion + 1} sur ${quiz.questions.length}`;

    progression.max = quiz.questions.length;
    progression.value = indexQuestion;

    correction.textContent = "";

    boutonValider.disabled = true;
    boutonValider.hidden = false;
    boutonSuivant.hidden = true;

    reponses.forEach((bouton) => {
        const index = Number(bouton.dataset.index);

        bouton.textContent = question.reponses[index];
        bouton.disabled = false;
        bouton.setAttribute("aria-pressed", "false");

        bouton.classList.remove("selected", "correct", "incorrect");
    });
}


// Sélectionner une réponse

reponses.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        if (!quiz || questionValidee) {
            return;
        }

        reponseChoisie = Number(bouton.dataset.index);

        reponses.forEach((autreBouton) => {
            const selectionne = autreBouton === bouton;

            autreBouton.classList.toggle("selected", selectionne);

            autreBouton.setAttribute(
                "aria-pressed",
                selectionne ? "true" : "false"
            );
        });

        boutonValider.disabled = false;
    });
});


// Valider la réponse et afficher la correction

boutonValider.addEventListener("click", () => {
    if (!quiz || reponseChoisie === null || questionValidee) {
        return;
    }

    const question = quiz.questions[indexQuestion];

    // Empêche de compter plusieurs fois la même réponse.
    questionValidee = true;

    const bonneReponse = reponseChoisie === question.bonneReponse;

    if (bonneReponse) {
        score++;

        correction.textContent =
            `Bonne réponse ! ${question.explication}`;
    } else {
        correction.textContent =
            `La bonne réponse était : ` +
            `${question.reponses[question.bonneReponse]}. ` +
            question.explication;
    }

    reponses.forEach((bouton) => {
        const index = Number(bouton.dataset.index);

        bouton.disabled = true;

        if (index === question.bonneReponse) {
            bouton.classList.add("correct");
        } else if (index === reponseChoisie) {
            bouton.classList.add("incorrect");
        }
    });

    progression.value = indexQuestion + 1;

    boutonValider.hidden = true;
    boutonSuivant.hidden = false;

    const derniereQuestion =
        indexQuestion === quiz.questions.length - 1;

    boutonSuivant.textContent = derniereQuestion
        ? "Voir mon résultat"
        : "Question suivante";

    boutonSuivant.focus();
});


// Passer à la question suivante ou afficher le score

boutonSuivant.addEventListener("click", () => {
    if (!quiz || !questionValidee) {
        return;
    }

    questionValidee = false;
    indexQuestion++;

    if (indexQuestion < quiz.questions.length) {
        afficherQuestion();
        reponses[0].focus();
    } else {
        contenu.hidden = true;
        resultat.hidden = false;

        scoreFinal.textContent =
            `Tu as obtenu ${score} sur ${quiz.questions.length} !`;

        boutonRejouer.focus();
    }
});


// Recommencer la partie

boutonRejouer.addEventListener("click", () => {
    if (!quiz || quiz.questions.length === 0) {
        return;
    }

    indexQuestion = 0;
    score = 0;

    resultat.hidden = true;
    contenu.hidden = false;

    afficherQuestion();
    reponses[0].focus();
});


// Démarrer le quiz

if (quiz && quiz.questions.length > 0) {
    titre.textContent = quiz.titre;
    description.textContent =
        quiz.description || `${quiz.questions.length} questions pour te tester.`;

    contenu.hidden = false;
    resultat.hidden = true;

    afficherQuestion();
} else {
    titre.textContent = "Quiz indisponible";
    description.textContent =
        "Retourne à la liste pour choisir un quiz disponible.";

    contenu.hidden = true;
    resultat.hidden = true;
}