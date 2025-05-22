import { body } from 'express-validator'
import Event from '../../models/Event.js'
import User from '../../models/User.js'
import slugify from 'slugify'

const rule = [

    body('creator_id')
        .trim()
        .notEmpty().withMessage('Creator ID is required').bail()
        .isMongoId().withMessage('Creator ID must be valid').bail()
        .custom(async (value) => {
            const existing = await User.findById(value);
            if (!existing) throw new Error('Creator ID must be valid');
            return true;
        }),

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required').bail()
        .custom(async (value) => {
            const slug = slugify(value, { lower: true });
            const existing = await Event.findOne({ slug });
            if (existing) throw new Error('Title already exists');
            return true;
        }),

    body('subtitle')
        .trim()
        .optional({ checkFalsy: true })
        .notEmpty().withMessage('Subtitle is required').bail(),

    body('description')
        .trim()
        .optional({ checkFalsy: true })
        .notEmpty().withMessage('Description is required').bail(),

    body('category')
        .trim()
        .notEmpty().withMessage('Category is required').bail(),

    body('rules')
        .optional({ checkFalsy: true })
        .notEmpty().withMessage('Rules are required').bail(),

    body('start_date')
        .trim()
        .notEmpty().withMessage('Start date is required').bail()
        .isISO8601().withMessage('Start date must be a valid date').bail()
        .custom((value, { req }) => {
            const date = new Date(value);
            const endDate = new Date(req.body.end_date);
            if (date >= endDate) {
                throw new Error('Start date must be before end date');
            }
            const today = new Date();
            if (date < today) {
                throw new Error('Start date cannot be a past date');
            }
            return true;
        }),

    body('end_date')
        .trim()
        .notEmpty().withMessage('End date is required').bail()
        .isISO8601().withMessage('End date must be a valid date').bail()
        .custom((value, { req }) => {
            const date = new Date(value);
            const startDate = new Date(req.body.start_date);
            if (date < startDate) {
                throw new Error('End date must be after start date');
            }
            const today = new Date();
            if (date < today) {
                throw new Error('End date cannot be a past date');
            }
            return true;
        }),

    body('visibility')
        .trim()
        .optional({ checkFalsy: true })
        .isBoolean().withMessage('Visibility must be a boolean').bail(),
];

export default rule