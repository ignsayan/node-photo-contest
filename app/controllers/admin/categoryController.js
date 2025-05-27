import { responseHandler } from '../../services/index.js'
import Category from '../../models/Category.js'
import listCategoryAction from '../../actions/admin/listCategoryAction.js'

export const listCategories = responseHandler(async (req) => {
    const categories = await listCategoryAction(req.query);
    return { data: categories };
});

export const getCategory = responseHandler(async (req) => {
    const category = await Category.findById(req.params.id);
    return { data: { category } };
});