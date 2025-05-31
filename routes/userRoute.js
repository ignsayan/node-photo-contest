import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import isVerifiedUser from '../app/middlewares/isVerifiedUser.js'
import {
    profile,
} from '../app/controllers/user/profileController.js'
import {
    getActiveEvents,
    createSubmission,
    listSubmissions,
} from '../app/controllers/user/submissionController.js'

// validation rules
import validateRules from '../app/middlewares/validateRules.js'
import createSubmissionRule from '../app/validations/user/createSubmissionRule.js'


const route = router();

// registered middlewares
route.use(isVerifiedUser('email'));

// registered routes
route.get('/profile',
    throttle(60, 60),
    profile
);
route.get('/events',
    getActiveEvents
);
route.post('/submission/create',
    throttle(60, 60),
    validateRules(createSubmissionRule, createSubmission)
);
route.get('/submissions',
    listSubmissions
);

export default route