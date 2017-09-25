const express = require('express');
const handle  = require('express-handlebars');
const bodyParser = require('body-parser');
const addEvent = require('./route/addEvent');
const index = require('./route/index');
const path = require('path');
const event = require('./route/event');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/events');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('handlebars', handle({
    layoutsDir: 'CalendarFrontEnd/views/layouts',
    defaultLayout: 'main',
  }));
  app.set('view engine', 'handlebars');
  app.set('views', `CalendarFrontEnd/views/`);

app.use('/',index);
app.use('/addEvent',addEvent);
app.use('/event',event);

app.listen(8000);