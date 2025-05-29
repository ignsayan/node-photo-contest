import Category from '../../models/Category.js'

const action = async (data) => {

    const { search, page, limit } = data;

    const params = {
        ...(search && { slug: new RegExp(search, 'i') }),
    };

    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
    }

    const categories = await Category.paginate(params, options);
    return categories;
};

export default action