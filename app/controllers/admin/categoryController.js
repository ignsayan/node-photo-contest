import responseHandler from '../../helpers/responseHandler.js'
import Category from '../../models/Category.js'


export const listCategories = responseHandler(async (req) => {
    const categories = await Category.find({});
    return { data: { categories } };
});

export const getCategory = responseHandler(async (req) => {
    const category = await Category.findById(req.params.id);
    return { data: { category } };
});