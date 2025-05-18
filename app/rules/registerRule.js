import { body } from 'express-validator'

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
        .normalizeEmail(),

    body('phone')
        .trim()
        .optional({ checkFalsy: true })
        .matches(/^[0-9]{10,15}$/).withMessage('Phone must be a valid number (10–15 digits)'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('password_confirmation')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must match'),
];

export default registerRule