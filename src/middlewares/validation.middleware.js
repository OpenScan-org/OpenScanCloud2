import { body, validationResult } from 'express-validator';

const validateUserRegistration = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username cannot be empty')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/\d/).withMessage('Password must contain a number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserLogin = [
    body('email')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password cannot be empty'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export { validateUserRegistration, validateUserLogin };
