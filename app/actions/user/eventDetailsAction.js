import { MEDIA } from '../../../configs/constants.js'
import Event from '../../models/Event.js'
import Submission from '../../models/Submission.js'

const action = async (data) => {

    const { id } = data;

    const event = await Event.findById(id);
    if (!event) throw new Error('Event not found');

    const submissions = await Submission.find({ event: id })
        .populate(
            {
                path: MEDIA.TYPE.USER_UPLOADS,
                select: ['url']
            }
        );

    const media = submissions.flatMap(media => media[MEDIA.TYPE.USER_UPLOADS]);
    const users = new Set(submissions.map(submission => submission.user.toString()));

    const contest = {
        '_id': event._id,
        'title': event.title,
        'subtitle': event.subtitle,
        'description': event.description,
        'rules': event.rules,
        'start_date': event.start_date,
        'end_date': event.end_date,
        'total_participants': users.size,
        'total_submissions': submissions.length,
        'user_uploads': media,
    };

    return contest;
};

export default action