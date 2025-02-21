const express = require('express');
const { register, login } = require('../controllers/users.controllers');
const router = express.Router();
const {getAllUsers,getUsersWithDetails,getSingleUserWithDetails} = require('../controllers/allUsers.controllers');
const {getUserDetails,createOrUpdateUserDetails,updateUserInfo} = require('../controllers/userDetails.controllers');
const upload = require('../middlewares/image_uploader'); // Import Multer configuration
const {createOrUpdateReportWaste,getReportWaste,updateReportWaste }= require('../controllers/userReportWaste.controller');
const { unRead, markRead } = require('../controllers/userNotification.controllers');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/allusersDetails',getUsersWithDetails)
router.get('/userDetails/:userId',getUserDetails)
router.post('/userDetails',createOrUpdateUserDetails)
router.post('/report-waste', upload.single('image'), createOrUpdateReportWaste);
router.get('/report-waste/:userId', getReportWaste);
router.put('/report-waste', upload.single('image'), updateReportWaste);
router.put('/userinfo', updateUserInfo);
router.get('/user/:id', getSingleUserWithDetails);
router.get('/unread', unRead);
router.put('/mark-read' , markRead);
module.exports = router;
