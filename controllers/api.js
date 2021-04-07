// Set up access to Database
const db = require('../models');

module.exports = (app) => {
    // This route handles the home page request for the most recent workout
    app.get('/api/workouts', async (request, response) => {
        // We have to aggregate so that the total duration of all exercises in the workout gets added as a field
        await db.Workouts.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                }
            }])
            .then(workouts => response.json(workouts))
            .catch(error => {
                throw new Error(`Something went wrong /controllers/api::17 ==> ${error}`)
            });
    });

    app.get('/api/workouts/range', async (request, response) => {
        let d = new Date();
        d.setDate(d.getDate() - 7);

        await db.Workouts.find({
                day: {
                    $gte: d
                }
            })
            .then(result => response.json(result))
            .catch(error => {
                throw new Error(`Something went wrong /controllers/api::32 ==> ${error}`);
            });
    });

    app.put('/api/workouts/:id', async (request, response) => {
        const exercise = request.body;

        await db.Workouts.update({
                _id: request.params.id
            }, {
                $push: {
                    'exercises': exercise
                }
            })
            .then(update => response.json(update))
            .catch(error => {
                throw new Error(`Something went wrong /controllers/api::48 ==> ${error}`)
            })

    });

    app.post('/api/workouts', async (request, response) => {
        await db.Workouts.create(request.body)
            .then(result => response.json(result))
            .catch(error => {
                throw new Error(`Something went wrong /controllers/api::57 ==> ${error}`)
            });
    });
};