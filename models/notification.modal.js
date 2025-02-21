// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Target user
  message: { type: String, required: true }, // Notification text
  isRead: { type: Boolean, default: false }, // Track read/unread
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Notification', notificationSchema);
