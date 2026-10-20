<script>
    import { asset, resolve } from '$app/paths';
    import Footer from '#lib/components/Footer.svelte';
    let { data } = $props();
    let quiz = $derived(data.quiz);
    let indexQuestion = $state(0);
    /** @type {number | null} */
    let reponseChoisie = $state(null);
    let questionValidee = $state(false);
    let score = $state(0);
    let termine = $state(false);
    let question = $derived(quiz.questions[indexQuestion]);

    function validerReponse() {
        if (reponseChoisie === null || questionValidee) return;

        questionValidee = true;
        if (reponseChoisie === question.bonneReponse) score += 1;
    }

    function questionSuivante() {
        if (!questionValidee) return;

        if (indexQuestion === quiz.questions.length - 1) {
            termine = true;
            return;
        }

        indexQuestion += 1;
        reponseChoisie = null;
        questionValidee = false;
    }

    function recommencer() {
        indexQuestion = 0;
        reponseChoisie = null;
        questionValidee = false;
        score = 0;
        termine = false;
    }
</script>

<svelte:head>
    <title>{quiz.titre} — NHL Zone</title>
    <meta name="description" content={`${quiz.questions.length} questions pour te tester.`} />
    <link rel="stylesheet" href={asset('legacy-style-quiz.css')} />
</svelte:head>

<main class="quiz-game">
    <a href={resolve('/quiz')} class="quiz-back">← Retour aux quiz</a>
    <section class="quiz-introduction">
        <h1>{quiz.titre}</h1>
        <p>{quiz.questions.length} questions pour te tester.</p>
    </section>

    {#if !termine}
        <section id="quiz-content" aria-labelledby="question-title">
            <div class="quiz-progress">
                <p id="question-counter">Question {indexQuestion + 1} sur {quiz.questions.length}</p>
                <progress value={indexQuestion + (questionValidee ? 1 : 0)} max={quiz.questions.length} aria-label="Questions terminées"></progress>
            </div>

            <h2 id="question-title">{question.question}</h2>
            <div class="quiz-answers" role="group" aria-labelledby="question-title">
                {#each question.reponses as reponse, index (index)}
                    <button
                        type="button"
                        class="answer"
                        class:selected={reponseChoisie === index}
                        class:correct={questionValidee && index === question.bonneReponse}
                        class:incorrect={questionValidee && reponseChoisie === index && index !== question.bonneReponse}
                        aria-pressed={reponseChoisie === index}
                        disabled={questionValidee}
                        onclick={() => (reponseChoisie = index)}
                    >{reponse}</button>
                {/each}
            </div>

            {#if questionValidee}
                <p id="quiz-feedback" aria-live="polite">
                    {#if reponseChoisie === question.bonneReponse}
                        Bonne réponse ! {question.explication}
                    {:else}
                        La bonne réponse était : {question.reponses[question.bonneReponse]}. {question.explication}
                    {/if}
                </p>
            {:else}
                <p id="quiz-feedback" aria-live="polite"></p>
            {/if}

            <div class="quiz-actions">
                {#if !questionValidee}
                    <button id="validate-answer" type="button" disabled={reponseChoisie === null} onclick={validerReponse}>
                        Valider ma réponse
                    </button>
                {:else}
                    <button id="next-question" type="button" onclick={questionSuivante}>
                        {indexQuestion === quiz.questions.length - 1 ? 'Voir mon résultat' : 'Question suivante'}
                    </button>
                {/if}
            </div>
        </section>
    {:else}
        <section id="quiz-result" aria-live="polite">
            <h2 id="result-title">Quiz terminé !</h2>
            <p id="final-score">Tu as obtenu {score} sur {quiz.questions.length} !</p>
            <button id="restart-quiz" type="button" onclick={recommencer}>Rejouer</button>
            <a href={resolve('/quiz')}>Choisir un autre quiz</a>
        </section>
    {/if}
</main>

<Footer />
