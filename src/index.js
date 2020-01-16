require('./model/User');

const express = require('express');
const mongoose = require('mongoose');
const authentificationRoutes = require('../src/routes/authentificationRoutes');
const requireAuthentification = require('../src/middlewares/requireAuthentification');
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
    console.log('Succesfully connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo instance', err);
});

app.get('/', requireAuthentification, (req, res) => {
    res.send(`your email: ${req.user.email}`)
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})