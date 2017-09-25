const express = require('express');
const mongoose = require('mongoose');
const eventDetail = require('../model/eventDetail');

const route = express.Router();

route.get('/:id/:title',(req,res)=>{
    eventDetail.findOne({id:req.params.id}).then((events)=>{
        events.event.forEach((snap)=>{
            if(snap.title === req.params.title){
                return res.render('eventDetail/eventDetail',{event:snap});
            }
        })
    })
})

route.post('/:id/:title',(req,res)=>{
    if(req.body.button === "delete"){
        eventDetail.findOne({id:req.params.id},(err,events)=>{
            for(let i = 0;i<events.event.length;i++){
                if(events.event[i].title === req.params.title){
                    events.event.splice(i,1);
                    events.save((err)=>{
                        return res.redirect('/');
                    })
                }
            }
        })
    }
    if(req.body.button === "update"){
        eventDetail.findOne({id:req.params.id},(err,events)=>{
            for(let i = 0;i<events.event.length;i++){
                if(events.event[i].title === req.params.title){
                    
                    events.event[i].title = req.body.newTitle;
                    events.event[i].startTime = req.body.newStartTime;
                    events.event[i].endTime = req.body.newEndTime;
                    events.event[i].description = req.body.newDescription;
                    events.save(()=>{
                        return res.redirect('/');
                    })
                }
            }
        })
    }
})

module.exports = route;