const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }, 
    event_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    bookingDate:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, {timestamps: true})