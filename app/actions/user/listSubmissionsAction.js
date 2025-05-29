import { MEDIA } from '../../../configs/constants.js'
import Submission from '../../models/Submission.js'

const action = async (data) => {

    const { search, page, limit } = data;

    const query = search ? { slug: new RegExp(search, 'i') } : {};

    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
        populate: [
            { path: MEDIA.TYPE.USER_UPLOADS, select: 'url' },
            { path: 'event', select: 'title' },
        ]
    };

    const submissions = await Submission.paginate(query, options);
    return submissions;
};

export default action