const jwt = require('jsonwebtoken');

// Sign JWT Token
const generateToken = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const { password, ...userWithoutPass } = userObj;
  return jwt.sign({ user:userWithoutPass }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Set expiration to 1 days
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
