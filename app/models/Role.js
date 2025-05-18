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
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }],
}, {
    timestamps: true,
    versionKey: false,
});

const Role = mongoose.model('Role', schema);
export default Role