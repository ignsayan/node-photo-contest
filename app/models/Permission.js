import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: value => /^[a-z0-9\-]+$/.test(value),
            message: props => `${props.value} is not a valid slug`,
        }
    }
}, {
    timestamps: true,
    versionKey: false,
});

const Permission = mongoose.model('Permission', schema);
export default Permission