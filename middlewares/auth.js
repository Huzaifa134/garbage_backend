const jwt = require('jsonwebtoken');

// Sign JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, name, email, password, userType, organizationName, contactPerson, location, registrationID, areasServed, typesOfWasteManaged,phone,score }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Set expiration to 1 days
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
