const express = require('express');
const {getEvents,createEvent,getEvent,updateEvent,deleteEvent} = require('../Controller/eventController')
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)
router.route('/').get(getEvents).post(createEvent)
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent)


module.exports = router