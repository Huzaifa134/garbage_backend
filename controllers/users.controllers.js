const { registerUser, loginUser } = require("../services/users.services");

// Register Controller
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    organizationName,
    contactPerson,
    location,
    registrationID,
    areasServed,
    typesOfWasteManaged,
    phone,
    score,
  } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const { user, userDetails } = await registerUser(
      name,
      email,
      password,
      userType,
      organizationName,
      contactPerson,
      location,
      registrationID,
      areasServed,
      typesOfWasteManaged,
      phone,
      score,
      image
    );
    res.status(201).json({ message: "User created", user, userDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
