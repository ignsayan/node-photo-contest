import Event from '../../models/Event.js'

const action = async ({ user, query }) => {

    const { search, status, page, limit } = query;

    const params = {
        user: user.id,
        ...(search && { slug: new RegExp(search, 'i') }),
        ...(status && { status })
    };

    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
    };

    const events = await Event.paginate(params, options);
    return events;
};

export default action