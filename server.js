require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {
    MongoClient
} = require('mongodb');
const PORT = process.env.PORT || 8080;
const app = express();



app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

const URI = process.env.MONGODB_URI;
const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connect(URI || 'mongodb://localhost/workout', {
    auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS
    },
    useNewUrlParser: true,
    useFindAndModify: true
});

require('./controllers/api')(app);
require('./controllers/html')(app);

try {
    client.connect();
    app.listen(PORT, async () => {
        console.log(`Listening on port ${PORT}.`);
    });
} catch (err) {
    console.error(`Error at app.js(53): ${err}`);
}