const mongoose = require('mongoose');

const reportWasteSchema= new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  wasteType: {
    type: String,
    default: '',
    required:false
  },
  Description: {
    type: String,
    default: '',
    required:false
  },
  urgencyLevel: {
    type: String,
    required:false
  },
  Location:{
    type: String,
    required:false
  },
  image:{
    type: String,
    required:false
  },
  status:{
    type: String,
    default: 'Pending',
    required:false
  }
  });

module.exports = mongoose.model('ReportWaste', reportWasteSchema);
