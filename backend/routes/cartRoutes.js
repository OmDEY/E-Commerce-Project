const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controller/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addToCart', authMiddleware, addToCart)
router.get('/getCart', getCart)

module.exports = router