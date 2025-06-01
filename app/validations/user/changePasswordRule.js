import { body } from 'express-validator'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'

const rule = [

    body('current_password')
        .notEmpty().withMessage('Current password is required').bail()
        .custom(async (value, { req }) => {
            const user = await User.findById(req.user.id);
            const isValid = await bcrypt.compare(value, user.password);
            if (!isValid) {
                throw new Error('Current password is incorrect');
            }
            return req.user = user;
        }),

    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters').bail(),

    body('password_confirmation')
        .notEmpty().withMessage('Confirm password is required').bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Password confirmation must match').bail(),
];

export default rule