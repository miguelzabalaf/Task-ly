// import express from 'express'; Not supported by NODE.
const express = require('express');
const routes = require('./routes');
const path = require('path');

// Create a app of express
const app = express();

// Activated Pug
app.set('view engine', 'pug');

// Add pages Foloder, indicates where is the location of the pages.
app.set('views', path.join(__dirname, './views'));

app.use('/', routes());

// Listen in the port 3200
app.listen(3200);
