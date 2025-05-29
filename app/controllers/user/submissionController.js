import { responseHandler } from '../../services/index.js'
import listActiveEventsAction from '../../actions/user/listActiveEventsAction.js'
import createSubmissionAction from '../../actions/user/createSubmissionAction.js'
import listSubmissionsAction from '../../actions/user/listSubmissionsAction.js'


export const getActiveEvents = responseHandler(async (req) => {
    const events = await listActiveEventsAction();
    return { data: { events } };
});

export const createSubmission = responseHandler(async (req) => {
    const media = await createSubmissionAction(req);
    return {
        message: 'Submission created successfully',
        data: { media }
    };
});

export const listSubmissions = responseHandler(async (req) => {
    const submissions = await listSubmissionsAction(req);
    return { data: submissions };
});