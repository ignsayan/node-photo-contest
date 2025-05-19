import responseHandler from '../helpers/responseHandler.js'
import User from '../models/User.js'

export const profile = responseHandler(async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    return { data: { user } };
});