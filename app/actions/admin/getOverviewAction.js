import User from '../../models/User.js'
import Submission from '../../models/Submission.js'
import Event from '../../models/Event.js'

const action = async () => {

    const usersCount = await User.countDocuments();
    const submissionsCount = await Submission.countDocuments();

    const events = await Event.find({});
    const ongoingEvents = events.filter(event => event.status === 'active');

    return {
        total_users: usersCount,
        total_submissions: submissionsCount,
        total_events: events.length,
        ongoing_events: ongoingEvents.length,
    }
};

export default action
