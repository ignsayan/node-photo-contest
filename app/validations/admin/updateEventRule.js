import { body, check } from 'express-validator'
import Event from '../../models/Event.js'
import slugify from 'slugify'

const rule = [

    check('id')
        .trim()
        .not().isEmpty().withMessage('Event id is required').bail()
        .isMongoId().withMessage('Event id must be a valid mongo id').bail()
        .custom(async (value, { req }) => {
            const existing = await Event.findById(req.params.id);
            if (!existing) throw new Error('Event not found');
            return true;
        }),

    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required').bail()
        .custom(async (value, { req }) => {
            const slug = slugify(value, { lower: true });
            const existing = await Event.findOne({ slug, status: 'active' });
            if (existing && existing._id.toString() !== req.params.id) {
                throw new Error('Title already exists');
            }
            return true;
        }),

    body('subtitle')
        .trim()
        .optional({ nullable: true })
        .not().isEmpty().withMessage('Subtitle cannot be an empty string').bail(),

    body('description')
        .trim()
        .optional({ nullable: true })
        .not().isEmpty().withMessage('Description cannot be an empty string').bail(),

    body('category')
        .trim()
        .not().isEmpty().withMessage('Category is required').bail(),

    body('rules')
        .optional({ nullable: true })
        .not().isEmpty().withMessage('Rules cannot be empty string').bail(),

    body('start_date')
        .not().isEmpty().withMessage('Start date is required').bail()
        .isISO8601().withMessage('Start date must be a valid date').bail()
        .custom((value, { req }) => {
            if (!req.body.end_date) return true; // only check if both are present
            const date = new Date(value);
            const endDate = new Date(req.body.end_date);
            if (date >= endDate) throw new Error('Start date must be before end date');
            return true;
        }),

    body('end_date')
        .not().isEmpty().withMessage('End date is required').bail()
        .isISO8601().withMessage('End date must be a valid date').bail()
        .custom((value, { req }) => {
            if (!req.body.start_date) return true;
            const date = new Date(value);
            const startDate = new Date(req.body.start_date);
            if (date <= startDate) throw new Error('End date must be after start date');
            return true;
        }),

    body('visibility')
        .optional({ checkFalsy: true })
        .isBoolean().withMessage('Visibility must be a boolean'),

    body('status')
        .optional({ checkFalsy: true })
        .isIn(['active', 'nominated', 'voting', 'ended'])
        .withMessage('Status must be one of [active, nominated, voting, ended]'),

    body('upload_limit')
        .not().isEmpty().withMessage('Upload limit is required').bail()
        .isNumeric().withMessage('Upload limit must be a number').bail(),

    body('upload_size')
        .not().isEmpty().withMessage('Please enter a valid upload size in KB').bail()
        .isNumeric().withMessage('Upload size must be a number').bail(),

    check('banner').custom((_, { req }) => {
        const file = req.files?.find(f => f.fieldname === 'banner');
        if (!file) return true;
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
