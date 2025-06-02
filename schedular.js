import cron from 'node-cron'
import Event from './app/models/Event.js'

// every day at midnight
cron.schedule('0 0 * * *', async () => {
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