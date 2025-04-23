import express from 'express';
import cors from 'cors';
import UserRoute from './routes/Userroute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen (5000, () => console.log('Server is running on port 5000'));