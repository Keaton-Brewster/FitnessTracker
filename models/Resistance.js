const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    type: {
        type: String,
        required: 'Type is required'
    },
    weight: {
        type: Number,
        required: 'Weight is required'
    },
    sets: {
        type: Number,
        required: 'Sets is required'
    },
    reps: {
        type: Number,
        required: 'Reps is required'
    },
    duration: {
        type: Number,
        required: 'Duration is required'
    }
});

const Resistance = mongoose.model('Resistance', resistanceSchema);

module.exports = Resistance;