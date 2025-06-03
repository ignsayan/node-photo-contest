import User from '../../models/User.js'
import Submission from '../../models/Submission.js'
import Event from '../../models/Event.js'
import Role from '../../models/Role.js'
import { ROLE } from '../../../configs/constants.js'

const action = async () => {

    const role = await Role.findOne({ name: ROLE.USER }).select('_id');
    if (!role) throw new Error('Desired role not found to get users');

    const usersCount = await User.countDocuments({ roles: role._id });
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
