import express from 'express';
import validate from '../app/middlewares/validate.js';
import {
    register,
    login,
} from '../app/http/controllers/authController.js';

import registerRule from '../app/http/rules/registerRule.js';
import loginRule from '../app/http/rules/loginRule.js';


const route = express.Router()

route.post('/register', registerRule, validate, register);
route.post('/login', loginRule, validate, login);

export default route