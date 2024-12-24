const express = require('express');
const { register, login } = require('../controllers/users.controllers');
const router = express.Router();
const {getAllUsers,getUsersWithDetails} = require('../controllers/allUsers.controllers');
const {getUserDetails,createOrUpdateUserDetails} = require('../controllers/userDetails.controllers');
const upload = require('../middlewares/image_uploader'); // Import Multer configuration
const {createOrUpdateReportWaste,getReportWaste,updateReportWaste }= require('../controllers/userReportWaste.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/allusersDetails',getUsersWithDetails)
router.get('/userDetails/:userId',getUserDetails)
router.post('/userDetails',createOrUpdateUserDetails)
router.post('/report-waste', upload.single('image'), createOrUpdateReportWaste);
router.get('/report-waste/:userId', getReportWaste);
router.put('/report-waste', upload.single('image'), updateReportWaste);
module.exports = router;
