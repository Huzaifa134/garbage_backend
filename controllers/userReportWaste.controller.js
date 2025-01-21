const ReportWaste = require('../models/ReportWate.model');
const upload = require('../middlewares/image_uploader'); // Import the Multer configuration
const User = require('../models/user.model');
const createOrUpdateReportWaste = async (req, res) => {
  const { userId, wasteType, Description, urgencyLevel, Location, status, view } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle Cloudinary image URL
    const image = req.file ? req.file.path : null; // req.file.path will contain the Cloudinary URL

    const reportWaste = new ReportWaste({
      user: userId,
      wasteType,
      Description,
      urgencyLevel,
      Location,
      image, // Save the Cloudinary URL
      status,
      view,
    });

    await reportWaste.save();

    user.score = (user.score || 0) + 10;
    await user.save();

    return res.status(201).json({
      message: 'New waste report successfully created',
      reportWaste,
      newScore: user.score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create waste report' });
  }
};

  
  const updateReportWaste = async (req, res) => {
    const { reportWasteId, wasteType, Description, urgencyLevel, Location, status,view } = req.body;
  
    try {
      const reportWaste = await ReportWaste.findById(reportWasteId);
      if (!reportWaste) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      if (wasteType) reportWaste.wasteType = wasteType;
      if (Description) reportWaste.Description = Description;
      if (urgencyLevel) reportWaste.urgencyLevel = urgencyLevel;
      if (Location) reportWaste.Location = Location;
      if (status) reportWaste.status = status;
      if (view) reportWaste.view = view;
  
      if (req.file) {
        reportWaste.image = `/uploads/${req.file.filename}`;
      }
  
      await reportWaste.save();
  
      return res.status(200).json({
        message: 'Waste report successfully updated',
        reportWaste,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update waste report' });
    }
  };
  

const getReportWaste = async (req, res) => {
    const { userId } = req.params;

    try {
        const reportWaste = await ReportWaste.findOne({ user: userId });

        if (!reportWaste) {
            return res.status(404).json({ message: 'User details not found' });
        }

        res.status(200).json(reportWaste);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
};


module.exports = { createOrUpdateReportWaste, getReportWaste,updateReportWaste };