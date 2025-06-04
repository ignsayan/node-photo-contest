import { responseHandler } from '../../services/index.js'
import listActiveEventsAction from '../../actions/user/listActiveEventsAction.js'
import eventDetailsAction from '../../actions/user/eventDetailsAction.js'
import createSubmissionAction from '../../actions/user/createSubmissionAction.js'
import listSubmissionsAction from '../../actions/user/listSubmissionsAction.js'
import getAdminStatsAction from '../../actions/admin/getAdminStatsAction.js'
import { getIoInstance } from '../../../configs/socketio.js'


export const getActiveEvents = responseHandler(async (req) => {
    const events = await listActiveEventsAction();
    return { data: { events } };
});

export const eventDetails = responseHandler(async (req) => {
    const event = await eventDetailsAction(req.params);
    return { data: { event } };
});

export const createSubmission = responseHandler(async (req) => {
    const media = await createSubmissionAction(req);
    const data = await getAdminStatsAction();
    const io = getIoInstance();
    io.of('/admin/stats').emit('admin:stats', data);
    return {
        message: 'Submission created successfully',
        data: { media }
    };
});

export const listSubmissions = responseHandler(async (req) => {
    const submissions = await listSubmissionsAction(req);
    return { data: submissions };
});