import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import isVerifiedUser from '../app/middlewares/isVerifiedUser.js'
import {
    getOverview,
} from '../app/controllers/admin/dashboardController.js'
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
import {
    listSubmissions,
} from '../app/controllers/admin/submissionController.js'

// validation rules
import validateRules from '../app/middlewares/validateRules.js'
import createEventRule from '../app/validations/admin/createEventRule.js'
import updateEventRule from '../app/validations/admin/updateEventRule.js'


const route = router();

// registered middlewares
route.use(isVerifiedUser());

// registered routes
route.get('/dashboard',
    getOverview
);
route.get('/events',
    listEvents
);
route.post('/event/create',
    throttle(20, 60),
    validateRules(createEventRule, createEvent)
);
route.get('/event/:id',
    throttle(60, 60),
    getEvent
);
route.put('/event/:id',
    throttle(10, 60),
    validateRules(updateEventRule, updateEvent)
);
route.delete('/event/:id', deleteEvent);

route.get('/category/list', listCategories);
route.get('/category/:id', getCategory);

route.get('/submissions',
    listSubmissions
);

export default route