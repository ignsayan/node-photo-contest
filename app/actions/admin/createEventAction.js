import slugify from 'slugify'
import Category from '../../models/Category.js'
import Event from '../../models/Event.js'

const action = async (body) => {

    let { category, visibility } = body;

    const categorySlug = slugify(category, { lower: true });

    category = await Category.findOne({ slug: categorySlug })
        || await Category.create({ name: category });

    body.category = category._id;
    body.visibility = [0, '0', false, 'false'].includes(visibility) ? false : true;

    const event = await Event.create(body);
    return event;
};

export default action