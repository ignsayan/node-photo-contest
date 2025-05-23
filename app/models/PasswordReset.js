import mongoose from 'mongoose'
import User from './User.js'

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        index: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
        index: { expires: 0 },
    }
}, {
    collection: 'password_resets',
    timestamps: true,
    versionKey: false,
});

const PasswordReset = mongoose.model('PasswordReset', schema);
export default PasswordReset