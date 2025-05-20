import express from 'express'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import { profile } from '../app/controllers/userController.js'


const route = express.Router()

// applying middleware checks
route.use(isAuthenticated, hasRole('user'));

route.get('/profile', profile);

export default route