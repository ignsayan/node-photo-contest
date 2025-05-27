import uploader from '../../configs/cloudinary.js'
import Image from '../models/Image.js'

const mediaUploader = async ({
    buffer,
    folder = 'uploads',
    refId,
    refModel,
    type = 'general',
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

    const image = await Image.create({
        ref_id: refId,
        ref_model: refModel,
        type,
        user,
        url: file.secure_url,
    });

    return image
};

export default mediaUploader