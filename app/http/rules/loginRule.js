import { body } from "express-validator";

const loginRule = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Valid email is required')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required'),
];

export default loginRule