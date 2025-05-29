import { body, check } from 'express-validator'
import Event from '../../models/Event.js'
import User from '../../models/User.js'
import slugify from 'slugify'

const rule = [

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required').bail()
        .custom(async (value) => {
            const slug = slugify(value, { lower: true });
            const existing = await Event.findOne({ slug, status: 'active' });
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

    body('status')
        .optional({ checkFalsy: true })
        .isIn(['active', 'nominated', 'voting', 'ended'])
        .withMessage('Status type must be in [active, nominated, voting, or ended]').bail(),

    check('banner').custom((_, { req }) => {

        const file = req.files?.find(f => f.fieldname === 'banner');
        if (!file) throw new Error('Banner is required');

        const mimes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!mimes.includes(file.mimetype)) {
            throw new Error('Only jpg, jpeg, and png files are allowed');
        }
        const limit = 500 * 1024;
        if (file.size > limit) {
            throw new Error(`Image must be less than 500 KB`);
        }
        return true;
    }),
];

export default rule