import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import User from './User.js'

const schema = new mongoose.Schema({
    ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ref_model: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        index: true,
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        default: null,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});

schema.plugin(mongoosePaginate);

const Image = mongoose.model('Image', schema);
export default Image