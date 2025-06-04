import responseHandler from '../../services/responseHandler.js'
import getAdminStatsAction from '../../actions/admin/getAdminStatsAction.js'


export const getOverview = responseHandler(async (req) => {
    const data = await getAdminStatsAction();
    return { data };
});