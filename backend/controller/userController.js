const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailQueue = require('../Queue/emailQueue');

const verifyToken = (req, res) => {
    // If the token is valid, it will reach this point
    res.json({
        msg: 'Token is valid',
        user: req.user // This is the decoded token, contains user data
    });
};

const fetchAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const users = await User.find().sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const firstName = name.split(' ')[0];
        const lastName = name.split(' ')[1];

        // Create new user
        user = new User({
            firstName,
            lastName,
            email,
            password,
        });

        // Save user to database
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
            expiresIn: '1d',
        });

        await emailQueue.add({ email, firstName }, { removeOnComplete: true });

        res.status(201).json({
            msg: 'User registered successfully',
            userId: user._id,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ userId: user._id, token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const captureUserData = async (req, res) => {
    try {
        const { userId, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.phoneNumber = phoneNumber;
        user.shippingAddress.addressLine1 = addressLine1;
        user.shippingAddress.addressLine2 = addressLine2;
        user.shippingAddress.city = city;
        user.shippingAddress.state = state;
        user.shippingAddress.postalCode = postalCode;
        user.shippingAddress.country = country;

        user.billingAddress = user.shippingAddress;

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    fetchAllUsers,
    registerUser,
    loginUser,
    captureUserData,
    getUserById,
    verifyToken
}