const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://assetflowbackedn.onrender.com',
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('CORS check — incoming origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS: ' + origin));
        }
    },
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // explicitly handle preflight for all routes

app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;