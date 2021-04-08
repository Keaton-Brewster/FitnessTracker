const path = require('path');

module.exports = (app) => {
    app.get('/', (request, response) => {
        response.sendFile(path.resolve('public/assets/html/index.html'));
    });

    app.get('/exercise', (request, response) => {
        response.sendFile(path.resolve('public/assets/html/exercise.html'));
    });

    app.get('/stats', (request, response) => {
        response.sendFile(path.resolve('public/assets/html/stats.html'))
    })
}