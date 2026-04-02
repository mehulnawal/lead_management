import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import leadRouter from './src/routes/lead.route.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIX - Issue5
app.use(cors({
    origin: [
        process.env.FRONTEND_ORIGIN_URL,
        'http://localhost:3000',
        'http://localhost:8000'
    ].filter(Boolean),
    credentials: true
}));

// FIX - Issue12
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

app.use('/api/v1/leads/', leadRouter);

export default app;