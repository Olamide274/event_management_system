const express = require('express')
const {createBooking, getBooking, cancelBooking} = require('../Controller/bookingController')
const router = express.Router()


router.post('/', createBooking )
router.get('/', getBooking)
router.get('/:id/cancel', cancelBooking)
module.exports = router