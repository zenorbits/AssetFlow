const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controller/auth.controller'); // adjust path/filename to match yours

router.post('/register', registerUser);
router.post('/login',loginUser);
module.exports = router;