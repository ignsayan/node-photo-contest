import { body } from 'express-validator'
import User from '../models/User.js'

const registerRule = [

    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must contain only letters'),

    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must contain only letters'),

    body('email')
        .trim()
        .isEmail().withMessage('Valid email is required')
        .normalizeEmail()
        .custom(async (value) => {
            const existing = await User.findOne({ email: value });
            if (existing) throw new Error('Email already exists');
            return true;
        }),

    body('phone')
        .trim()
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('Phone must be a number')
        .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits')
        .custom(async (value) => {
            if (value) {
                const existing = await User.findOne({ phone: value });
                if (existing) throw new Error('Phone number already exists');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('password_confirmation')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must match'),
];

export default registerRule