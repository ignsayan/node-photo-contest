import mongoose from 'mongoose'
import slugify from 'slugify'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        index: true,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});

schema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Category = mongoose.model('Category', schema);
export default Category