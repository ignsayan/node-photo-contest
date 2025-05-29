import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { MEDIA } from '../../configs/constants.js'

const transform = (doc, rec) => {
    delete rec.id;
    return rec;
};

const schema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
}, {
    timestamps: true,
    versionKey: false
});

schema.virtual(MEDIA.TYPE.USER_UPLOADS, {
    ref: 'Media',
    foreignField: 'ref_id',
    localField: '_id',
    justOne: false,
    options: { match: { ref_model: 'Submission', type: MEDIA.TYPE.USER_UPLOADS } }
});

schema.set('toObject', { virtuals: true, transform });
schema.set('toJSON', { virtuals: true, transform });

schema.plugin(mongoosePaginate);

const Submission = mongoose.model('Submission', schema);
export default Submission