import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

const schema = new mongoose.Schema({
    name: {
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
    description: {
        type: String,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.pre('validate', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

schema.plugin(mongoosePaginate);

const Category = mongoose.model('Category', schema);
export default Category