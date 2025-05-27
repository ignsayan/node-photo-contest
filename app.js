import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import dbconnect from './configs/database.js'
import corspolicy from './configs/corspolicy.js'
import index from './views/index.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'

await dbconnect(); // connect to database

const app = express();

// registered middlewares
app.use(corspolicy);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// registered routes
app.use('/api', [
    authRoute,
    adminRoute,
    userRoute,
]);

app.get('/', index); // root index

// start the server
app.listen(process.env.APP_PORT, () => {
    console.log('✅ Server started');
});