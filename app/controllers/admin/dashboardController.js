import { responseHandler } from '../../services/index.js'
import getOverviewAction from '../../actions/admin/getOverviewAction.js'


export const getOverview = responseHandler(async (req) => {
    const data = await getOverviewAction();
    return { data };
});