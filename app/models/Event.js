import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import User from './User.js'
import Category from './Category.js'
import slugify from 'slugify'

const transform = (doc, rec) => {
    delete rec.id;
    return rec;
};

const schema = new mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
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
        ref: Category,
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
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.virtual('banner', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'ref_id',
    justOne: true,
    options: { match: { ref_model: 'Event', type: 'banner' } }
});

schema.virtual('user_uploads', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'ref_id',
    justOne: false,
    options: { match: { ref_model: 'Event', type: 'user_upload' } }
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