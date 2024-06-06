const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').trim().isLength({ min: 5 }).withMessage('Password must be atleast 5 characters')
    ]
}
const signupValidationRules = () => {
    return [
        body('name').trim().notEmpty().withMessage('Name is required'),
        ...loginValidationRules()
    ]
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
    return res.status(422).json({ errors: extractedErrors })
}
module.exports = { validate, signupValidationRules, loginValidationRules }