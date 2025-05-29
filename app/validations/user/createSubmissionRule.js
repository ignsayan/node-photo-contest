import { body, check } from 'express-validator'
import Event from '../../models/Event.js'

const rule = [

    body('event')
        .trim()
        .notEmpty().withMessage('Event is required').bail()
        .isMongoId().withMessage('Event must be valid').bail()
        .custom(async (value) => {
            const existing = await Event.findOne({ _id: value, status: 'active' });
            if (!existing) throw new Error('Invalid or expired event');
            return true;
        }),

    check('user_uploads').custom((_, { req }) => {

        const files = req.files;
        if (!files || !Array.isArray(files)) {
            throw new Error('User uploads must be an array of images');
        }
        if (files.length < 1 || files.length > 3) {
            throw new Error('You must upload between 1 and 3 images');
        }
        for (const file of files) {
            const mimes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!mimes.includes(file.mimetype)) {
                throw new Error(`Invalid file type: ${file.originalname}`);
            }
            const limit = 500 * 1024;
            if (file.size > limit) {
                throw new Error(`Image must be less than 500 KB`);
            }
        }
        return true;
    }),
];

export default rule