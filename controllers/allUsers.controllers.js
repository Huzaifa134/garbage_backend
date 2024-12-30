
const User = require('../models/user.model');
const UserDetails = require('../models/userDetails.model');
const ReportWaste = require('../models/ReportWate.model');


const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}).select('-password'); // Exclude password field for security
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}



const getUsersWithDetails = async (req, res) => {
  try {
    const users = await User.find().lean(); // Fetch users as plain JavaScript objects
    const userIds = users.map(user => user._id);

    // Fetch additional details for the users
    const userDetails = await UserDetails.find({ user: { $in: userIds } }).lean();
    const reportWaste = await ReportWaste.find({ user: { $in: userIds } }).lean();

    // Merge user details with the base user data
    const combinedData = users.map(user => {
      const details = userDetails.find(detail => detail.user.toString() === user._id.toString());
      const reports = reportWaste.filter(report => report.user.toString() === user._id.toString());
      return { ...user, details: details || null , reportWaste: reports.length > 0 ? reports : []};
    });

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users with details' });
  }
};



const getSingleUserWithDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    // Fetch the base user data
    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch additional details for the user
    const details = await UserDetails.findOne({ user: id }).lean();
    const reportWaste = await ReportWaste.find({ user: id }).lean();

    // Combine the data
    const combinedData = {
      ...user,
      details: details || null,
      reportWaste: reportWaste.length > 0 ? reportWaste : [],
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user with details' });
  }
};

module.exports = {getAllUsers,getUsersWithDetails,getSingleUserWithDetails};