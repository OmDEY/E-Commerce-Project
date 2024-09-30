const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check token
async function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Fetch the user from the database using the user ID in the token
    const user = await User.findById(decoded.userId).select('-password'); // Exclude the password field
    
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Attach the user object to the req object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
