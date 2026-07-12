const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();

const allowedOrigins = [
    'http://localhost:5173',              // your local Vite dev server
    'https://asset-flow-sandy.vercel.app', // your deployed frontend
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman, curl, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;