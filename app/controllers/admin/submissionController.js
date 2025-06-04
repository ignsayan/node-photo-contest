import responseHandler from '../../services/responseHandler.js'
import getSubmissionsAction from '../../actions/admin/getSubmissionsAction.js'


export const listSubmissions = responseHandler(async (req) => {
    const submissions = await getSubmissionsAction(req);
    return { data: { submissions } };
});