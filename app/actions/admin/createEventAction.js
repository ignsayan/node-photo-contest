import slugify from 'slugify'
import Category from '../../models/Category.js'
import Event from '../../models/Event.js'
import uploader from '../../../configs/cloudinary.js'
import Image from '../../models/Image.js'

const action = async ({ body, files }) => {

    let { category, visibility } = body;

    const categorySlug = slugify(category, { lower: true });

    category = await Category.findOne({ slug: categorySlug })
        || await Category.create({ name: category });

    body.category = category._id;
    body.visibility = [0, '0', false, 'false'].includes(visibility) ? false : true;

    const event = await Event.create(body);

    if (event && files.length > 0) {

        const file = await uploader(files[0].buffer, 'banners');
        await Image.create({
            ref_id: event._id,
            ref_model: Event.modelName,
            type: 'banner',
            uploaded_by: event.creator_id,
            url: file.secure_url,
        })
    }

    return event;
};

export default action