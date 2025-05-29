import Submission from '../../models/Submission.js'
import { mediaUploader } from '../../services/index.js'
import { MEDIA } from '../../../configs/constants.js'

const action = async ({ user, body }) => {

    const { event, files } = body;

    const submission = await Submission.create({
        event,
        user: user.id,
    });

    const uploads = [];

    if (submission && files.length > 0) {

        for (const file of files) {

            const media = await mediaUploader({
                buffer: file.buffer,
                refId: submission._id,
                refModel: Submission.modelName,
                type: MEDIA.TYPE.USER_UPLOADS,
                user: submission.user,
            });

            uploads.push(media.url);
        }
    }

    return uploads;
};

export default action