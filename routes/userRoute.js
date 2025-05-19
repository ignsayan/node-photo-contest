import express from 'express'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import { profile } from '../app/controllers/userController.js'

const route = express.Router()

route.use(isAuthenticated)

route.get('/profile', profile);

export default route