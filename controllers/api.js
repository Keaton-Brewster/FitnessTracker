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

        // switch the type of the exercise so we know which model to add it to
        switch (request.body.type) {
            case 'cardio':
                // const Cardio = await db.Cardio.create(exercise)
                //     .catch(e => {
                //         throw new Error(e)
                //     });
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
                break;
            case 'resistance':
                // const Resistance = await db.Resistance.create(exercise)
                //     .catch(e => {
                //         return new Error(e)
                //     });
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
                break;
        }

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