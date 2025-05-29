import Event from '../../models/Event.js'
import { MEDIA } from '../../../configs/constants.js'

const action = async () => {

    const events = await Event
        .find({
            visibility: true,
            status: 'active',
        }, {
            title: 1,
            description: 1,
            subtitle: 1,
        })
        .populate([
            {
                path: MEDIA.TYPE.BANNER,
                select: ['url'],
            },
        ]);

    return events;
};

export default action