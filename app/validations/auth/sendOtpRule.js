import { body } from 'express-validator'
import User from '../../models/User.js'

const rule = [

    body('attribute')
        .trim()
        .notEmpty().withMessage('Email or phone is required').bail()
        .custom((value, { req }) => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isPhone = /^\d{10}$/.test(value);
            if (!isEmail && !isPhone) {
                throw new Error('Must be a valid email or phone number');
            }
            req.body.channel = isEmail ? 'email' : 'phone';
            return true;
        }),
];

export default rule