import responseHandler from '../../services/responseHandler.js'
import Event from '../../models/Event.js'
import createEventAction from '../../actions/admin/createEventAction.js'
import listEventsAction from '../../actions/admin/listEventsAction.js'
import updateEventAction from '../../actions/admin/updateEventAction.js'
import getAdminStatsAction from '../../actions/admin/getAdminStatsAction.js'
import { getIoInstance } from '../../../configs/socketio.js'


export const listEvents = responseHandler(async (req) => {
    const events = await listEventsAction(req);
    return { data: events };
});

export const createEvent = responseHandler(async (req) => {
    const event = await createEventAction(req);
    const data = await getAdminStatsAction();
    const io = getIoInstance();
    io.of('/admin/stats').emit('admin:stats', data);
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
    const event = await updateEventAction(req);
    return {
        message: 'Event updated successfully',
        data: { event }
    };
});

export const deleteEvent = responseHandler(async (req) => {
    //
});