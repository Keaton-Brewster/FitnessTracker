const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    type: {
        type: String,
        required: 'Type is required'
    },
    distance: {
        type: Number,
        required: 'Distance is required'
    },
    duration: {
        type: Number,
        required: 'Duration is required'
    }
});

const Cardio = mongoose.model('Cardio', cardioSchema);

module.exports = Cardio;