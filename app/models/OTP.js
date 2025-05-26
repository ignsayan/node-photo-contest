import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    channel: {
        type: String,
        required: true,
        index: true,
    },
    code: {
        type: Number,
        required: true,
        index: true,
    },
    expiry: {
        type: Date,
        required: true,
        expires: 0,
    },
}, {
    collection: 'otps',
    timestamps: true,
    versionKey: false
});

const OTP = mongoose.model('OTP', schema);
export default OTP