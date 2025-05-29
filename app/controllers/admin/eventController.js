import { responseHandler } from '../../services/index.js'
import Event from '../../models/Event.js'
import createEventAction from '../../actions/admin/createEventAction.js'
import listEventsAction from '../../actions/admin/listEventsAction.js'
import getSubmissionsAction from '../../actions/admin/getSubmissionsAction.js'

export const listEvents = responseHandler(async (req) => {
    const events = await listEventsAction(req.query);
    return { data: events };
});

export const createEvent = responseHandler(async (req) => {
    const event = await createEventAction(req);
    return {
        message: 'Event created successfully',
        data: { event }
    };
});

export const getSubmissions = responseHandler(async (req) => {
    const submissions = await getSubmissionsAction(req);
    return { data: { submissions } };
});

export const getEvent = responseHandler(async (req) => {
    const event = await Event.findById(req.params.id);
    return { data: { event } };
});

export const updateEvent = responseHandler(async (req) => {
    //
});

export const deleteEvent = responseHandler(async (req) => {
    //
});