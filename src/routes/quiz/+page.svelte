<script>
    import { asset, resolve } from '$app/paths';
    import Footer from '#lib/components/Footer.svelte';

    const quizImageBase = asset('images/quiz/global.png').replace(/global\.png$/, '');
    const quizzes = [
        {
            id: 'bases',
            title: 'Les bases de la NHL',
            description: "Teste tes connaissances sur les règles et l'histoire de la NHL.",
            image: 'global.png'
        },
        {
            id: 'franchises',
            title: 'Les franchises NHL',
            description: 'Teste tes connaissances sur les différentes équipes de la NHL.',
            image: 'franchises.png'
        },
        {
            id: 'saison',
            title: 'La saison 2025-2026',
            description: 'Teste tes connaissances sur la saison 2025-2026.',
            image: 'season.png'
        },
        {
            id: 'joueurs-emblematiques',
            title: 'Les joueurs emblématiques',
            description: 'Teste tes connaissances sur les joueurs emblématiques de la NHL.',
            image: 'legends.png'
        }
    ];
</script>

<svelte:head>
    <title>Quiz — NHL Zone</title>
    <meta name="description" content="Testez vos connaissances sur la NHL avec quatre quiz interactifs." />
    <link rel="stylesheet" href={asset('legacy-style-quiz.css')} />
</svelte:head>

<main class="quiz-list-page">
    <h1>Quiz <span class="quiz-title">NHL</span><span class="quiz-title2">Zone</span></h1>
    <h2>Teste tes connaissances sur la NHL avec nos quiz interactifs !</h2>
    <section class="quiz-container" aria-label="Choisir un quiz">
        {#each quizzes as quiz (quiz.id)}
            <article class="quiz-card">
                <img src={`${quizImageBase}${quiz.image}`} alt={quiz.title} loading="lazy" />
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <a class="quiz-button" href={resolve('/quiz/[id]', { id: quiz.id })}>Commencer le quiz</a>
            </article>
        {/each}
    </section>
</main>

<Footer />

<style>
    .quiz-card img {
        width: 100%;
        margin-bottom: 20px;
        border-radius: 10px;
    }

    .quiz-button {
        display: inline-block;
        margin-top: 16px;
        padding: 12px 18px;
        color: white;
        background: #101c30;
        border-radius: 8px;
        font-weight: 700;
    }

    .quiz-button:hover {
        color: #101c30;
        background: #39bde0;
    }
</style>
