const UserDetails = require('../models/userDetails.model');

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


module.exports = { createOrUpdateUserDetails, getUserDetails };