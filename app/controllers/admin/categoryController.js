import responseHandler from '../../helpers/responseHandler.js'
import Category from '../../models/Category.js'


export const listCategories = responseHandler(async (req) => {
    const { search, page, limit } = req.query;

    const query = search ? { slug: new RegExp(search, 'i') } : {};
    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
    }
    const categories = await Category.paginate(query, options);
    return { data: categories };
});

export const getCategory = responseHandler(async (req) => {
    const category = await Category.findById(req.params.id);
    return { data: { category } };
});