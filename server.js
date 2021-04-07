const express = require('express');
const mongoose = require('mongoose');
const {
    client,
    connect,
    disconnect,
    show_dbs
} = require('./config');
const PORT = process.env.PORT || 8080;
const app = express();



app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

//! MAY NOT WANT TO USE THESE IN THE FINAL APP, BUT FOR NOW I AM JUST TRYING TO GET THE REMOTE DB WORKING
process.env.MONGODB_PASS = 'FitnessTrackerDBKPB';
process.env.MONGODB_USER = 'FitnessTracker'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: true
});

require('./controllers/api')(app);
require('./controllers/html')(app);

try {
    show_dbs(client);
    app.listen(PORT, async () => {
        console.log(`Listening on port ${PORT}.`);
    });
} catch (err) {
    console.error(`Error at app.js(53): ${err}`);
}