const UserDetails = require('../models/userDetails.model');
const User = require('../models/user.model');
const createOrUpdateUserDetails = async (req, res) => {
    const { userId, organizationName, contactPerson, Location, registrationID, areasServed, typesofWasteManaged } = req.body;

    try {
        // Check if details already exist for the user
        let userDetails = await UserDetails.findOne({ user: userId });

        if (userDetails) {
            // Update existing details
            userDetails.organizationName = organizationName || userDetails.organizationName;
            userDetails.contactPerson = contactPerson || userDetails.contactPerson;
            userDetails.Location = Location || userDetails.Location;
            userDetails.registrationID = registrationID || userDetails.registrationID;
            userDetails.areasServed = areasServed || userDetails.areasServed;
            userDetails.typesofWasteManaged = typesofWasteManaged || userDetails.typesofWasteManaged;

            await userDetails.save();
            return res.status(200).json(userDetails);
        }

        // Create new details
        userDetails = new UserDetails({
            user: userId,
            organizationName,
            contactPerson,
            Location,
            registrationID,
            areasServed,
            typesofWasteManaged,
        });

        await userDetails.save();
        res.status(201).json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create or update user details' });
    }
};

const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const userDetails = await UserDetails.findOne({ user: userId });

    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};

const updateUserInfo = async (req, res) => {
  const { userId, name, email, phone } = req.body;

  // Validate input
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name ?? user.name; // Use nullish coalescing to prevent overwriting with undefined
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};



module.exports = { createOrUpdateUserDetails, getUserDetails,updateUserInfo };