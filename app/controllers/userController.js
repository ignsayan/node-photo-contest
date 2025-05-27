import { responseHandler } from '../services/index.js'
import User from '../models/User.js'

export const profile = responseHandler(async (req) => {
    const { id } = req.user;
    const user = await User.findById(id);
    return { data: { user } };
});