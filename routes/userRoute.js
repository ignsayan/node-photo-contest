import express from 'express'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import { profile } from '../app/controllers/userController.js'
import throttle from '../app/middlewares/throttle.js'


const route = express.Router()

route.use(throttle(60, 60)); // applying rate limiter
route.use(isAuthenticated, hasRole('admin', 'user')); // role middleware

route.get('/profile', profile);

export default route