const User = require('../models/user.model');
const UserDetails = require('../models/userDetails.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');

// Register User
const registerUser = async (name, email, password, userType, organizationName, contactPerson, location, registrationID, areasServed, typesOfWasteManaged,phone,score  ) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    userType,
    phone,
    score
  });

  const userDetails = await UserDetails.create({
    user: user._id,
    organizationName,
    contactPerson,
    location,
    registrationID,
    areasServed,
    typesOfWasteManaged,
  })

  return {user, userDetails};
};

// Login User
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
