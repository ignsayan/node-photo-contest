import express from 'express'
import Event from '../app/models/Event.js'

const route = express.Router();

route.get('/event-expiry', async (req, res) => {
    try {
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
        res.sendStatus(200);

    } catch (error) {
        res.send().json(error.message);
    }
});

export default route