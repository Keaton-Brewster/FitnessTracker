const db = require('../models');

module.exports = (app) => {
    app.get('/api/workouts', (request, response) => {
        db.Workouts.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                }
            }])
            .then(workouts => response.json(workouts))
            .catch(error => response.error(error));
    })

    app.put('/api/workouts/:id', async (request, response) => {
        const exercise = request.body;
        console.log(exercise);


        await db.Workouts.update({
                _id: request.params.id
            }, {
                $push: {
                    'exercises': exercise
                }
            })
            .catch(e => {
                throw new Error(e)
            })

        response.json({
            "working": "true"
        });
    })

    app.post('/api/workouts', (request, response) => {
        db.Workouts.create(request.body)
            .then(result => response.json(result))
            .catch(error => response.error(error));
    })
}