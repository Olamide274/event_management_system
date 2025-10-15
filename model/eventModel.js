const mongoose = require('mongoose')



const eventSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    Title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    Description: {
        type: String,
        required: [true, 'Please add a description value']
    },
    Date: {
        type: String,
        required: [true, 'Please add a date value']
    },
    Time: {
        type: String,
        required: [true, 'Please add a time value']
    },
    Venue: {
        type: String,
        required: [true, 'Please add a venue value']
    },
    Organizer: {
        type: String,
        required: [true, 'Please add an organizer value']
    },
    Type: {
        type: String,
        required: [true, 'Please add a type value']
    },
    Image: {
        type: String,
        required: [true, 'Please add an image value']
    },
    Capacity: {
        type: Number,
        required: [true, 'Please add a capacity value']
    },
    Price: {
        type: Number,
        required: [true, 'Please add a price value']
    },
    Status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], 
        required: [true, 'Please add a status value']
        
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)