import { validationResult } from 'express-validator'

const validateRules = (rules, controller) => [
    ...rules,
    (req, res, next) => {

        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        const formattedErrors = {};
        errors.array().forEach(error => {
            if (!formattedErrors[error.path]) {
                formattedErrors[error.path] = [];
            }
            formattedErrors[error.path].push(error.msg);
        });

        return res.status(422).json({ errors: formattedErrors });
    },
    controller,
];

export default validateRules
