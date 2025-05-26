import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import validateRules from '../app/middlewares/validateRules.js'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import {
    profile
} from '../app/controllers/userController.js'

const route = router();

// registered middlewares
route.use(throttle(10, 30));
route.use(isAuthenticated, hasRole('admin', 'user'));

// registered routes
route.get('/profile', profile);

export default route