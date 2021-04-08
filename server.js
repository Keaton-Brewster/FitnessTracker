require('dotenv').config();
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const {
    MongoClient
} = require('mongodb');
const PORT = process.env.PORT || 8080;
const app = express();


app.use(compression());
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
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(mongoose.connection);
    console.log('mongoose connected')
})

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