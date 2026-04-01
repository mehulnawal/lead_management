import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRouter from './src/routes/lead.route.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN_URL,
    credentials: true
}))

// route
app.use('/api/v1/leads/', leadRouter)

export default app;