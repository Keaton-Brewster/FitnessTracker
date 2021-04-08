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
console.log(client);

mongoose.connect(URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
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