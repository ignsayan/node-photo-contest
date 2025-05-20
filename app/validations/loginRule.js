import { body } from 'express-validator'

const loginRule = [
    body('email')
        .optional({ checkFalsy: true })
        .isEmail().withMessage('Valid email is required')
        .normalizeEmail(),

    body('username')
        .optional({ checkFalsy: true })
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Username can only be alphanumeric')
        .custom(async (value, { req }) => {
            if (value && req.body.email) {
                throw new Error('Email and username cannot be present at the same time')
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required'),
];

export default loginRule