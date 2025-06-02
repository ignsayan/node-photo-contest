import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'
import { MEDIA } from '../../configs/constants.js'

const transform = (doc, rec) => {
    delete rec.id;
    return rec;
};

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    slug: {
        type: String,
        index: true,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    subtitle: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    rules: {
        type: String,
        default: null,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    visibility: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ['active', 'nominated', 'voting', 'ended'],
        default: 'active',
    },
    upload_limit: {
        type: Number,
        required: true,
    },
    upload_size: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.virtual(MEDIA.TYPE.BANNER, {
    ref: 'Media',
    localField: '_id',
    foreignField: 'ref_id',
    justOne: true,
    options: { match: { ref_model: 'Event', type: MEDIA.TYPE.BANNER } }
});

schema.virtual(MEDIA.TYPE.USER_UPLOADS, {
    ref: 'Media',
    foreignField: 'ref_id',
    localField: '_id',
    justOne: false,
    options: { match: { ref_model: 'Event', type: MEDIA.TYPE.USER_UPLOADS } }
});

schema.set('toObject', { virtuals: true, transform });
schema.set('toJSON', { virtuals: true, transform });

schema.pre('validate', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

schema.plugin(mongoosePaginate);

const Event = mongoose.model('Event', schema);
export default Event