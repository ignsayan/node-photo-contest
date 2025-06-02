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

    check('user_uploads')
        .custom(async (value, { req }) => {
            const files = req.files;
            if (!files || !Array.isArray(files)) {
                throw new Error('User uploads must be an array of images');
            }

            const event = await Event.findById(req.body.event);
            if (files.length < 1 || files.length > event.upload_limit) {
                throw new Error(`Maximum image upload limit is ${event.upload_limit}`);
            }
            for (const file of files) {
                const mimes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!mimes.includes(file.mimetype)) {
                    throw new Error(`Invalid file type: ${file.originalname}`);
                }
                const limit = event.upload_size * 1024;
                if (file.size > limit) {
                    throw new Error(`Image must be less than ${event.upload_size} KB`);
                }
            }
            return true;
        }),
];

export default rule