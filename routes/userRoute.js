import { router, throttle } from '../app/middlewares/throttledRoutes.js'
import isVerifiedUser from '../app/middlewares/isVerifiedUser.js'
import {
    profile,
    changePassword,
} from '../app/controllers/user/profileController.js'
import {
    getActiveEvents,
    eventDetails,
    createSubmission,
    listSubmissions,
} from '../app/controllers/user/submissionController.js'

// validation rules
import validateRules from '../app/middlewares/validateRules.js'
import createSubmissionRule from '../app/validations/user/createSubmissionRule.js'
import changePasswordRule from '../app/validations/user/changePasswordRule.js'


const route = router();

route.post('/change-password',
    throttle(60, 60),
    validateRules(changePasswordRule, changePassword)
);

// routes that require email verification
route.use(isVerifiedUser('email'));
route.get('/profile',
    throttle(60, 60),
    profile
);
route.get('/events',
    getActiveEvents
);
route.get('/event/:id',
    eventDetails
);

// routes that require phone verification
route.use(isVerifiedUser('phone'));
route.post('/submission/create',
    throttle(60, 60),
    validateRules(createSubmissionRule, createSubmission)
);
route.get('/submissions',
    listSubmissions
);

export default route