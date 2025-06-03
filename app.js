import express from 'express'
import dotenv from 'dotenv'
import { websocket } from './configs/socketio.js'
import dbconnect from './configs/database.js'
import corspolicy from './configs/cors.js'
import isAuthenticated from './app/middlewares/isAuthenticated.js'
import hasRole from './app/middlewares/hasRole.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'
import webRoute from './routes/webRoute.js'
import './schedular.js'
import adminSocket from './app/sockets/adminSocket.js'
import userSocket from './app/sockets/userSocket.js'

dotenv.config();
await dbconnect();

const app = express();
const { server, io } = websocket(app);

app.use(corspolicy);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// guest routes
app.use('/', webRoute);
app.use('/api/auth', authRoute);

// authenticated routes
app.use(isAuthenticated);
app.use('/api/admin', hasRole('admin'), adminRoute);
app.use('/api/user', hasRole('admin', 'user'), userRoute);

// registered sockets
adminSocket(io);
userSocket(io);

// start the server
server.listen(process.env.APP_PORT, () => {
    console.log('✅ Server started');
});