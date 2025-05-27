import slugify from 'slugify'
import Category from '../../models/Category.js'
import Event from '../../models/Event.js'
import { mediaUploader } from '../../services/index.js'

const action = async (data) => {

    let { category, visibility, files } = data;

    const categorySlug = slugify(category, { lower: true });

    category = await Category.findOne({ slug: categorySlug })
        || await Category.create({ name: category });

    data.category = category._id;
    data.visibility = [0, '0', false, 'false'].includes(visibility) ? false : true;
    data.user = data.creator_id;

    const event = await Event.create(data);

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