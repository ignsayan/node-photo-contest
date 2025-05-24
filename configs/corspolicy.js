import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const corspolicy = cors({
    origin: [
        'http://localhost:5090',
        process.env.FRONTEND_URL
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});


export default corspolicy