const express = require('express');
const app = express();
const animalRoutes = require ('./api/routes/animals');
const mainRoutes = require ('./api/routes/main');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

//mongoose.set('bufferCommands', false);
mongoose.connect('mongodb+srv://mrs885:86428642@cluster0-jkifg.mongodb.net/animals',
    { useNewUrlParser: true, useUnifiedTopology: true});
                
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected!');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allows-Origin', '*');
    next();
});

app.use('/animals', animalRoutes);

app.use('/', mainRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

 app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status,
        }
    })
}); 

module.exports = app;