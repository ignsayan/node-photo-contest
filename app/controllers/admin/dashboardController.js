import { responseHandler } from '../../services/index.js'
import getAdminDashboard from '../../actions/admin/getAdminDashboard.js'


export const getOverview = responseHandler(async (req) => {
    const data = await getAdminDashboard();
    return { data };
});