const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:tata@cluster0.v9dxttl.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
    console.log('req recue');
    next();
})

app.use( (req, res, next) => {
    res.status(201);
    next();
})

app.use( (req, res, next) => {
    res.json( {message: 'coucou'})
})

module.exports = app;