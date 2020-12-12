// import express from 'express'; Not supported by NODE.
const express = require('express');
const routes = require('./routes');
const path = require('path');
const BodyParser = require('body-parser');

// Helpers with many functions
const helpers = require('./helpers/helpers')

// Create the conection to DB
const db = require('./config/db');
const { RSA_NO_PADDING } = require('constants');

// Import mnodel
require('./models/Projects');
require('./models/Tasks');

// db.authenticate() Only Authentication
db.sync()
  .then(() => console.log('Conect to server'))
  .catch((err) => console.log('Error to conection', err))

// Create a app of express
const app = express();

// Activated Pug
app.set('view engine', 'pug');

// Add pages Foloder, indicates where is the location of the pages.
app.set('views', path.join(__dirname, './views'));

// Pass vardumb to thze app
app.use((req, resp, next) => {
  // use the bardump function in all application
  resp.locals.consultResults = helpers.consultResults;
  next();
})

// Turn on the library BodyParser to read the forms data
app.use(BodyParser.urlencoded({ extended: true }))

// Indicates where is the location of the static forlders in this project
app.use(express.static('./public'));

app.use('/', routes());

// Listen in the port 3200
app.listen(3000);
