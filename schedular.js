import cron from 'node-cron'
import Event from './app/models/Event.js'

// every day at midnight
cron.schedule('* * * * *', async () => {
    const today = new Date();
    await Event.updateMany(
        {
            status: 'ended',
            end_date: { $gte: today }
        },
        {
            $set: { status: 'active' }
        }
    );
});