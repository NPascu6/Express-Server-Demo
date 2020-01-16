const express = require('express');
const mongoose = require('mongoose');
const authentificationRoutes = require('../src/routes/authentificationRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(authentificationRoutes);

const _mongoURI = 'mongodb+srv://admin:Password!1@cluster0-xluyd.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(_mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('succesfully connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongo instance', err);
});

app.get('/', (req, res) => {
    res.send('Hello')
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})