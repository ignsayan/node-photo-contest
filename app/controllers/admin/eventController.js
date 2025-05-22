import responseHandler from '../../helpers/responseHandler.js'
import createEventAction from '../../actions/admin/createEventAction.js'
import updateEventAction from '../../actions/admin/updateEventAction.js'


export const listEvents = responseHandler(async (req) => {
});

export const createEvent = responseHandler(async (req) => {
    const event = await createEventAction(req.body);
    return {
        message: 'Event created successfully',
        data: { event }
    };
});

export const getEvent = responseHandler(async (req) => {
    //
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