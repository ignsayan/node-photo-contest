import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dbconnect from './configs/database.js'

import authRoute from './routes/auth.js'

const policy = {
    origin: [
        process.env.FRONTEND_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

dbconnect(); // invoke the database connection

const app = express()
app.use(express.json())
app.use(cors(policy))

// Registered routes
app.use('/auth', authRoute)

// Listener
app.listen(process.env.APP_PORT, () => console.log('✅ Server started'))