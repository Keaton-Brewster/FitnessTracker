// Set up access to Database
const db = require('../models');

module.exports = (app) => {
    // This route handles the home page request for the most recent workout
    app.get('/api/workouts', async (request, response) => {
        // We have to aggregate so that the total duration of all exercises in the workout gets added as a field
        try {
            await db.Workouts.aggregate([{
                    $addFields: {
                        totalDuration: {
                            $sum: '$exercises.duration'
                        }
                    }
                }])
                .then(workouts => response.json(workouts))
                .catch(error => {
                    response.json(error);
                    throw new Error(`Something went wrong /controllers/api::17 ==> ${error}`);
                });
        } catch (error) {
            response.json(error);
            throw new Error(error);
        }
    });

    app.get('/api/workouts/range', async (request, response) => {
        let d = new Date();
        d.setDate(d.getDate() - 7);

        try {
            await db.Workouts.aggregate([{
                        $match: {
                            day: {
                                $gte: d
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalDuration: {
                                $sum: '$exercises.duration'
                            }
                        }
                    }
                ])
                .then(result => response.json(result))
                .catch(error => {
                    throw new Error(`Something went wrong /controllers/api:: ==> ${error}`);
                });
        } catch (error) {
            response.json(error);
            throw new Error(error);
        }
    });

    app.put('/api/workouts/:id', async (request, response) => {
        const workoutID = request.params.id;
        const exercise = request.body;


        if (workoutID === 'undefined') {
            await db.Workouts.create({})
                .then(document => {
                    document.update({
                        $push: {
                            'exercises': exercise
                        }
                    });
                    document.save();
                    response.json(document);
                });
        } else {
            await db.Workouts.update({
                    _id: request.params.id
                }, {
                    $push: {
                        'exercises': exercise
                    }
                })
                .then(update => response.json(update))
                .catch(error => {
                    throw new Error(`Something went wrong /controllers/api::82 ==> ${error}`)
                })
        }
    });

    app.post('/api/workouts', async (request, response) => {
        try {
            await db.Workouts.create({})
                .then(result => response.json(result))
                .catch(error => {
                    throw new Error(`Something went wrong /controllers/api::57 ==> ${error}`)
                });
        } catch (error) {
            response.json(error);
            throw new Error(error);
        }
    });
};