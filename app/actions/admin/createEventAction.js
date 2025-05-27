import slugify from 'slugify'
import Category from '../../models/Category.js'
import Event from '../../models/Event.js'
import mediaUploader from '../../helpers/mediaUploader.js'

const action = async ({ body, files }) => {

    let { category, visibility } = body;

    const categorySlug = slugify(category, { lower: true });

    category = await Category.findOne({ slug: categorySlug })
        || await Category.create({ name: category });

    body.category = category._id;
    body.visibility = [0, '0', false, 'false'].includes(visibility) ? false : true;
    body.user = body.creator_id;

    const event = await Event.create(body);

    if (event && files.length > 0) {

        await mediaUploader({
            buffer: files[0].buffer,
            refId: event._id,
            refModel: Event.modelName,
            type: 'banner',
            user: event.user,
        });
    }

    return event;
};

export default action