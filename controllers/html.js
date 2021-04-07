const path = require('path');

module.exports = (app) => {
    app.get('/', (request, response) => {
        response.sendFile(path.resolve('public/assets/index.html'));
    });

    app.get('/exercise', (request, response) => {
        response.sendFile(path.resolve('public/assets/exercise.html'));
    });

    app.get('/stats', (request, response) => {
        response.sendFile(path.resolve('public/assets/stats.html'))
    })
}