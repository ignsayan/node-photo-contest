import express from 'express'
import validateRules from '../app/middlewares/validateRules.js'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import throttle from '../app/middlewares/throttle.js'
import {
    createEvent,
    deleteEvent,
    getEvent,
    listEvents,
    updateEvent
} from '../app/controllers/admin/eventController.js'

// validation rules
import createEventRule from '../app/validations/admin/createEventRule.js'
import updateEventRule from '../app/validations/admin/updateEventRule.js'


const route = express.Router()

// registered middlewares
route.use(throttle(30, 60));
route.use(isAuthenticated, hasRole('admin'));

// registered routes
route.get('/event/list', listEvents);
route.post('/event/create', validateRules(createEventRule, createEvent));
route.get('/event/:id', getEvent);
route.put('/event/:id', validateRules(updateEventRule, updateEvent));
route.delete('/event/:id', deleteEvent);

export default route