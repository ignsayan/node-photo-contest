import uploader from '../../configs/cloudinary.js'
import { MEDIA } from '../../configs/constants.js'
import Media from '../models/Media.js'

const mediaUploader = async ({
    buffer,
    folder = 'uploads',
    refId,
    refModel,
    type = MEDIA.TYPE.GENERAL,
    user,
}) => {

    if (!buffer || !refId || !refModel || !user) {
        throw new Error('Missing required parameters for media upload.');
    }

    const file = await new Promise((resolve, reject) => {
        const stream = uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });

    const media = await Media.create({
        ref_id: refId,
        ref_model: refModel,
        type,
        user,
        url: file.secure_url,
    });

    return media
};

export default mediaUploader