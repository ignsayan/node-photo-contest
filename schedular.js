import cron from 'node-cron'
import Event from './app/models/Event.js'

cron.schedule('* */10 * * *', async () => {
    const today = new Date();
    await Event.updateMany(
        {
            status: 'active',
            end_date: { $lte: today }
        },
        {
            $set: { status: 'ended' }
        }
    );
});