const express = require('express');
const router = express.Router();
const { fetchAllUsers, registerUser, loginUser, captureUserData, getUserById } = require('../controller/userController');

router.get('/fetchAllUsers', fetchAllUsers)
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.post('/auth/captureUserData', captureUserData)
router.get('/getUserById/:id', getUserById)

module.exports = router;