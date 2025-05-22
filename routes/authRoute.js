import express from 'express'
import validateRules from '../app/middlewares/validateRules.js'
import throttle from '../app/middlewares/throttle.js'
import {
    register,
    login,
} from '../app/controllers/auth/authController.js'

// validation rules
import registerRule from '../app/validations/auth/registerRule.js'
import loginRule from '../app/validations/auth/loginRule.js'


const route = express.Router()

// registered middlewares
route.use(throttle(30, 60));

// registered routes
route.post('/register', validateRules(registerRule, register));
route.post('/login', validateRules(loginRule, login));

export default route