const mongoose = require('mongoose');
const eventDetailSchema = mongoose.Schema({
    id: {type:Number,max:28,require:true},
    
    event:[{
        title : String,
        id : Number,
        startTime : String,
        endTime : String,
        description: String
    }],
});

const eventDetail = mongoose.model('eventDetail',eventDetailSchema);

module.exports = eventDetail;