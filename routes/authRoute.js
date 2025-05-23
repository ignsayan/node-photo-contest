import express from 'express'
import validateRules from '../app/middlewares/validateRules.js'
import throttle from '../app/middlewares/throttle.js'
import {
    register,
    login,
} from '../app/controllers/auth/authController.js'
import {
    forgotPassword,
    resetPassword,
} from '../app/controllers/auth/passwordController.js'

// validation rules
import registerRule from '../app/validations/auth/registerRule.js'
import loginRule from '../app/validations/auth/loginRule.js'
import forgotPasswordRule from '../app/validations/auth/forgotPasswordRule.js'
import resetPasswordRule from '../app/validations/auth/resetPasswordRule.js'


const route = express.Router()

// registered middlewares
route.use(throttle(100, 60));

// registered routes
route.post('/register', validateRules(registerRule, register));
route.post('/login', validateRules(loginRule, login));

route.post('/forgot-password', validateRules(forgotPasswordRule, forgotPassword));
route.post('/reset-password', validateRules(resetPasswordRule, resetPassword));

export default route