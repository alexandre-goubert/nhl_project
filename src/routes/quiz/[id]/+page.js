import { error } from '@sveltejs/kit';
import { quizDisponibles } from '#lib/data/quiz-questions.js';

export function entries() {
    return Object.keys(quizDisponibles).map((id) => ({
        id
    }));
}

export function load({ params }) {
    if (!Object.hasOwn(quizDisponibles, params.id)) {
        error(404, 'Quiz introuvable');
    }

    return { quiz: quizDisponibles[/** @type {keyof typeof quizDisponibles} */ (params.id)] };
}
