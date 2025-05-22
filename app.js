import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dbconnect from './configs/database.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'

const policy = {
    origin: [
        process.env.FRONTEND_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

await dbconnect(); // connect to database

const app = express();

// registered middlewares
app.use(cors(policy));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// registered routes
app.use('/api', [
    authRoute,
    adminRoute,
    userRoute,
]);

// start the server
app.listen(process.env.APP_PORT, () => {
    console.log('✅ Server started')
});