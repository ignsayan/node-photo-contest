import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dbconnect from './configs/database.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'

const policy = {
    origin: [
        process.env.FRONTEND_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

await dbconnect(); // invoke the database connection

const app = express();

app.use(cors(policy));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Registered routes
app.use('/api', [
    authRoute,
    userRoute,
]);

// Listener
app.listen(process.env.APP_PORT, () => {
    console.log('✅ Server started')
});