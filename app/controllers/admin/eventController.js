import responseHandler from '../../helpers/responseHandler.js'
import Event from '../../models/Event.js'
import createEventAction from '../../actions/admin/createEventAction.js'
import updateEventAction from '../../actions/admin/updateEventAction.js'


export const listEvents = responseHandler(async (req) => {
    const events = await Event.find({}).populate('banner');
    return { data: { events } };
});

export const createEvent = responseHandler(async (req) => {
    const event = await createEventAction(req);
    return {
        message: 'Event created successfully',
        data: { event }
    };
});

export const getEvent = responseHandler(async (req) => {
    const event = await Event.findById(req.params.id);
    return { data: { event } };
});

export const updateEvent = responseHandler(async (req) => {
    const event = await updateEventAction(req.params.id, req.body);
    return {
        message: 'Event updated successfully',
        data: { event }
    };
});

export const deleteEvent = responseHandler(async (req) => {
    //
});