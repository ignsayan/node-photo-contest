import { body } from 'express-validator'

const loginRule = [
    body('email')
        .if(body('username').not().exists())
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format').bail()
        .normalizeEmail(),

    body('username')
        .optional({ checkFalsy: true })
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Username can only be alphanumeric').bail()
        .custom(async (value, { req }) => {
            if (value && req.body.email) {
                throw new Error('Email and username cannot be present at the same time')
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('Password is required').bail(),
];

export default loginRule