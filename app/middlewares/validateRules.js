import multer from 'multer'
import { validationResult } from 'express-validator'

const validateRules = (rules, controller) => {

    const storage = multer.memoryStorage();
    const files = multer({ storage });

    return [
        (req, res, next) => {
            files.any()(req, res, (error) => {
                if (error) req.multerError = error;
                next();
            });
        },

        ...rules,

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = {};
                errors.array().forEach(error => {
                    if (!formattedErrors[error.path]) {
                        formattedErrors[error.path] = [];
                    }
                    formattedErrors[error.path].push(error.msg);
                });
                return res.status(422).json({ errors: formattedErrors });
            }
            next();
        },

        controller,
    ];
};

export default validateRules;
