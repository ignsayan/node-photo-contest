import slugify from 'slugify'
import Category from '../../models/Category.js'
import Event from '../../models/Event.js'
import mediaHandler from '../../services/mediaHandler.js'
import Media from '../../models/Media.js'
import { MEDIA } from '../../../configs/constants.js'

const action = async ({ params, body }) => {

    let { category, visibility, files } = body;

    const categorySlug = slugify(category, { lower: true });

    category = await Category.findOne({ slug: categorySlug })
        || await Category.create({ name: category });

    visibility = [0, '0', false, 'false'].includes(visibility) ? false : true;

    const event = await Event.findByIdAndUpdate(params.id, {
        ...body,
        category: category._id,
        visibility,
    }, {
        new: true,
    });

    if (event && files) {
        await Media.deleteMany({
            ref_id: event._id,
            ref_model: Event.modelName
        });
        await mediaHandler.upload({
            buffer: files[0].buffer,
            folder: MEDIA.TYPE.BANNER,
            refId: event._id,
            refModel: Event.modelName,
            type: MEDIA.TYPE.BANNER,
            user: event.user,
        });
    }

    return event;
};

export default action