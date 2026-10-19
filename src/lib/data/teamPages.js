export const teamPageLoaders = import.meta.glob('./team-pages/*.html', {
    query: '?raw',
    import: 'default'
});
