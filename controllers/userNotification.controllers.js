// routes/notification.js
const express = require('express');
const Notification = require('../models/notification.modal.js');

const router = express.Router();

// Get unread notifications (specific to the logged-in user)
// router.get('/unread', authMiddleware, async (req, res) => {
const unRead = async (req, res) => {
  try {
    const {userId} = req.query;
    console.log(userId)
    const notifications = await Notification.find({ userId, isRead: false }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// Mark all notifications as read (for logged-in user)
// router.put('/mark-read', authMiddleware, async (req, res) => {
const markRead = async (req, res) => {
  try {
    const {userId} = req.body;
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications:', error);
    res.status(500).json({ error: 'Error marking notifications' });
  }
};

module.exports = { unRead, markRead };
