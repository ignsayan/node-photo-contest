import { responseHandler } from '../../services/index.js'
import Event from '../../models/Event.js'
import createSubmissionAction from '../../actions/user/createSubmissionAction.js'
import Submission from '../../models/Submission.js'
import { MEDIA } from '../../../configs/constants.js'

export const getActiveEvents = responseHandler(async (req) => {
    const events = await Event
        .find({ visibility: true, status: 'active' })
        .populate(MEDIA.TYPE.BANNER);

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
    const submissions = await Submission
        .find({ user: req.user.id })
        .populate(MEDIA.TYPE.USER_UPLOADS)
        .populate('event');

    return { data: { submissions } };
});