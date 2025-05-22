import express from 'express'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import throttle from '../app/middlewares/throttle.js'
import { profile } from '../app/controllers/userController.js'


const route = express.Router()

// registered middlewares
route.use(throttle(60, 60));
route.use(isAuthenticated, hasRole('admin', 'user'));

// registered routes
route.get('/profile', profile);

export default route