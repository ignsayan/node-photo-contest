import { MEDIA } from '../../../configs/constants.js'
import Submission from '../../models/Submission.js'

const action = async ({ user, query }) => {

    const { page, limit } = query;
    const params = { user: user.id };

    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
        populate: [
            {
                path: MEDIA.TYPE.USER_UPLOADS,
                select: ['url'],
            },
            {
                path: 'event',
                select: ['title', 'slug'],
            },
        ]
    };

    const submissions = await Submission.paginate(params, options);
    return submissions;
};

export default action