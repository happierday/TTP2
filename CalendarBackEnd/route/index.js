const express = require('express');
const mongoose = require('mongoose');
const eventDetail = require('../model/eventDetail');
const route = express.Router();

route.get('/',(req,res)=>{
    let event = [];
    eventDetail.find({},(err,allEvent)=>{
        allEvent.forEach((events)=>{
            event[events.id-1] = events;
        })
        res.render('home/home',{events:event,error:req.params.error});
    })
})

module.exports = route;