import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import validateRules from '../app/middlewares/validateRules.js'
import isAuthenticated from '../app/middlewares/isAuthenticated.js'
import hasRole from '../app/middlewares/hasRole.js'
import {
    createEvent,
    deleteEvent,
    getEvent,
    listEvents,
    updateEvent
} from '../app/controllers/admin/eventController.js'
import {
    getCategory,
    listCategories,
} from '../app/controllers/admin/categoryController.js'

// validation rules
import createEventRule from '../app/validations/admin/createEventRule.js'

const route = router();

// registered middlewares
route.use(throttle(60, 60));
route.use(isAuthenticated, hasRole('admin'));

// registered routes
route.get('/event/list', listEvents);
route.post('/event/create', validateRules(createEventRule, createEvent));
route.get('/event/:id', getEvent);
route.put('/event/:id', updateEvent);
route.delete('/event/:id', deleteEvent);

route.get('/category/list', listCategories);
route.get('/category/:id', getCategory);


export default route