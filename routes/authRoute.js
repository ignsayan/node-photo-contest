import express from 'express'
import validateRules from '../app/middlewares/validateRules.js'
import throttle from '../app/middlewares/throttle.js'
import {
    register,
    login,
} from '../app/controllers/authController.js'

import registerRule from '../app/validations/registerRule.js'
import loginRule from '../app/validations/loginRule.js'


const route = express.Router()

route.use(throttle(5, 20)); // applying rate limiter

route.post('/register', validateRules(registerRule, register));
route.post('/login', validateRules(loginRule, login));

export default route