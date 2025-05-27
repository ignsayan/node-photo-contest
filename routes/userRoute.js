import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import isVerifiedUser from '../app/middlewares/isVerifiedUser.js'
import {
    profile
} from '../app/controllers/userController.js'


const route = router();

// registered middlewares
route.use(isVerifiedUser());

// registered routes
route.get('/profile',
    throttle(60, 60),
    profile
);

export default route