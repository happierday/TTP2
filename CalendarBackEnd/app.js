const express = require('express');
const handle  = require('express-handlebars');
const bodyParser = require('body-parser');
const addEvent = require('./route/addEvent');
const index = require('./route/index');
const path = require('path');
const event = require('./route/event');
const eventDetail = require('./model/eventDetail');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/events');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //generate entries
    eventDetail.findOne({id:1},(err,event)=>{
        if(event!=null){
            console.log("already existed");
        }else{
            for(let i = 1;i<=28;i++){
                let newEvent= new eventDetail({id:i});
                
                newEvent.save((err)=>{  
                })
            }
        }
    })
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