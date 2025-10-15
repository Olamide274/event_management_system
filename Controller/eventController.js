const asyncHandler = require('express-async-handler')
const Event = require('../model/eventModel')


// GET EVENTS
// /api/events GET

const getEvents = asyncHandler(async(req,res) => {
    const event = await Event.find({user_id: req.user.id})
    res.json(event)
})


// GET EVENTS
// /api/events CREATE

const createEvent = asyncHandler(async(req,res) => {
    console.log('The request body is:', req.body)
    const {Title,Description,Date,Time,Venue,Organizer,Type,Image,Capacity,Price,Status} = req.body
    if(!Title || !Description || !Date || !Time || !Venue || !Organizer || !Type || !Image || !Capacity || !Price || !Status){
        res.status(400)
        throw new Error("All fields are mandatory");
        
    }

    const event = await Event.create({Title,Description,Date,Time,Venue,Organizer,Type,Image,Capacity,Price,Status, user_id: req.user.id})
    if(!event){
        res.status(400)
        throw new Error("Event data is not valid")
    }
    res.json(event)
})



// GET EVENT
// /api/events GET

const getEvent = asyncHandler(async(req,res) => {
    const event = await Event.findById(req.params.id)
    if(!event){
        res.status(404)
        throw new Error("Event not found")
    }
    res.json(event)
})


// UPDATE EVENT
// /api/events PUT

const updateEvent = asyncHandler(async(req,res) => {
    const event = await Event.findById(req.params.id)
    if(!event){
        res.status(404)
        throw new Error("Event not found")
    }

    if(event.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update another user event ");
        
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedEvent)
})

// DELETE EVENT
// /api/events DELETE

const deleteEvent = asyncHandler(async(req,res) => {
    const event = await Event.findById(req.params.id)
    if(!event){
        res.status(404)
        throw new Error("Event not found")
    }

    if(event.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete other user event");
        
    }
    const deleteEvent = await Event.findByIdAndDelete(req.params.id, req.body, {new: true})
    res.json(deleteEvent)
})

module.exports = {getEvents, createEvent, getEvent, updateEvent, deleteEvent}