const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [Object]
});

const Workouts = mongoose.model('Workouts', workoutsSchema);

module.exports = Workouts;