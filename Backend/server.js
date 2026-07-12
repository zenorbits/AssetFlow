const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();


app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;