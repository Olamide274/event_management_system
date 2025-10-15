const asyncHandler = require('express-async-handler')
const Event = require('../model/eventModel')
const Booking = require('../model/bookingModel')


const createBooking = asyncHandler(async(req,res) => {
    const {event_id} = req.body
     const user_id = req.user.id


     const event = await Event.find(event_id)
     if(!event){
        res.status(400)
        throw new Error("Event not found");
     }


     const existingBooking = await Booking.findById({event_id, status: 'confirmed'})
     if(existingBooking >= event.Capacity){
        res.status(400)
        throw new Error("Event is fully booked");
        
     }

     const alreadyBooked = await Booking.findOne({user_id, event_id, status: 'confirmed'})
     if(alreadyBooked){
        res.status(400)
        throw new Error("Event is already Booked");
        
     }

     const booking = await Booking.create({event_id, user_id})
     res.status(201).json(booking)
})


// GET USER BOOKING

const getBooking = asyncHandler(async(req,res) => {
    const bookings = await Booking.find({user_id: req.user.id}).populate('event_id')
    res.json({bookings})
})

// CANCEL BOOKING

const cancelBooking = asyncHandler(async(req,res) => {
    const booking = await Booking.findById(req.params.id)
   if(!booking){
    res.status(400)
    throw new Error("Booking not found");
   }

   if(booking.user_id.toString() !== req.user.id){
    res.status(400)
    throw new Error("You do not have permission to cancel this booking");
   }

   booking.status = 'cancelled'
   await booking.save()


   res.json({message: "Booking cancelled successfully"})
})


module.exports = {createBooking, getBooking, cancelBooking}

