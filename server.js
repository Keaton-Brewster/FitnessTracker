require('dotenv').config();
const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const app = express();


app.use(compression());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

require('./controllers/api')(app);
require('./controllers/html')(app);

try {
    app.listen(PORT, async () => {
        console.log(`Listening on port ${PORT}.`);
    });
} catch (err) {
    console.error(`Error at app.js(53): ${err}`);
}