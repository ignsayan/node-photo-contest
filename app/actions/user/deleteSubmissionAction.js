import mediaHandler from '../../services/mediaHandler.js'
import Submission from '../../models/Submission.js'
import { MEDIA } from '../../../configs/constants.js'

const action = async (data) => {

    const { params } = data;

    const submission = await Submission.findById(params.id);
    if (!submission) throw new Error('Invalid submission');

    await submission.populate({
        path: MEDIA.TYPE.USER_UPLOADS,
        select: ['url', 'public_id'],
    });

    const files = submission[MEDIA.TYPE.USER_UPLOADS].map(file => file.public_id);

    await mediaHandler.remove(files);
    await submission.deleteOne();
};

export default action