import responseHandler from '../../services/responseHandler.js'
import Category from '../../models/Category.js'
import listCategoriesAction from '../../actions/admin/listCategoriesAction.js'


export const listCategories = responseHandler(async (req) => {
    const categories = await listCategoriesAction(req.query);
    return { data: categories };
});

export const getCategory = responseHandler(async (req) => {
    const category = await Category.findById(req.params.id);
    return { data: { category } };
});