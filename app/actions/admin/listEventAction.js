import Event from '../../models/Event.js'

const action = async (data) => {

    const { search, page, limit } = data;

    const query = search ? { slug: new RegExp(search, 'i') } : {};

    const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: { createdAt: -1 },
        populate: 'banner'
    }

    const events = await Event.paginate(query, options);
    return events;
};

export default action