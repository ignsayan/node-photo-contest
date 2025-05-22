import mongoose from 'mongoose'
import User from './User.js'
import Category from './Category.js'
import slugify from 'slugify'

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
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.pre('validate', function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Event = mongoose.model('Event', schema);
export default Event