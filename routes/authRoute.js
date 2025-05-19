import express from 'express'
import validateRules from '../app/middlewares/validateRules.js'
import {
    register,
    login,
} from '../app/controllers/authController.js'

import registerRule from '../app/validations/registerRule.js'
import loginRule from '../app/validations/loginRule.js'


const route = express.Router()

route.post('/register', validateRules(registerRule, register));
route.post('/login', validateRules(loginRule, login));

export default route