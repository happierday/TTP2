const express = require('express');
const mongoose = require('mongoose');
const eventDetail = require('../model/eventDetail');
const route = express.Router();

route.get('/:id',(req,res)=>{

    eventDetail.findOne({id:req.params.id},(err,events)=>{
        if(events.event.length === 4){
            res.render('addEvent/addEvent',{event:events,message:true});
        }else{
            res.render('addEvent/addEvent',{event:events});
        }
    })
})

route.post('/:id',(req,res)=>{
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    let time1 = startTime.split(":");
    let time2 = endTime.split(":");

    let totalTime1 = time1[0] * 60 + time1[1];
    let totalTime2 = time2[0] * 60 + time2[1];

    if(totalTime2 < totalTime1){
        return res.redirect('/');
    }

    let title = req.body.title;
    let newEvent = new eventDetail();
    eventDetail.findOne({id:req.params.id},(err,events)=>{
        // if(events === null){
        //     console.log("not Found");
        //     newEvent.id = req.params.id;
        //     newEvent.event = [{
        //         startDate:req.body.startDate,
        //         endDate:req.body.endDate,
        //         // startDate:startDate,
        //         // endDate:endDate,
        //         description:req.body.description
        //     }];
        //     newEvent.save((err)=>{
        //         if(err) return res.render('addEvent/addEvent',{date:req.params.id,message:err.message});
        //     })
        // }else{
        events.event.push({
            id:req.params.id,
            title:title,
            startTime:startTime,
            endTime:endTime,
            description:req.body.description
        })
        events.save((err)=>{
            if(err) return res.render('addEvent/addEvent',{date:req.params.id,message:err.message});
        })
        
    }).then(()=>{
        res.redirect('/');
    })
})
module.exports = route;