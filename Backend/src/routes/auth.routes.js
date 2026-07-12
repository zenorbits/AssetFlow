const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/auth.controller'); // adjust path/filename to match yours

router.post('/register', registerUser);

module.exports = router;