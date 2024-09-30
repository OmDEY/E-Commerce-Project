const express = require('express');
const router = express.Router();
const { fetchAllUsers, registerUser, loginUser, captureUserData } = require('../controller/userController');

router.get('/fetchAllUsers', fetchAllUsers)
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/captureUserData', captureUserData)

module.exports = router;