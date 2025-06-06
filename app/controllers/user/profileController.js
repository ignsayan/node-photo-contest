import responseHandler from '../../services/responseHandler.js'
import User from '../../models/User.js'
import Event from '../../models/Event.js'


export const profile = responseHandler(async (req) => {
    const { id } = req.user;
    const user = await User.findById(id);
    return { data: { user } };
});

export const activeEvents = responseHandler(async (req) => {
    const events = await Event.find(
        { visibility: true, status: 'active' },
        { title: 1, _id: 1 },
    );
    return { data: { events } };
});

export const changePassword = responseHandler(async (req) => {
    const { user, body } = req;
    user.password = body.password;
    await user.save();
    return { message: 'Password updated successfully' };
});