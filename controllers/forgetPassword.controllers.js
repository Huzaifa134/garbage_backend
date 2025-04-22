const jwt = require('jsonwebtoken');
const express = require('express');
// const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');

const generateResetToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_RESET_SECRET, {
      expiresIn: '15m', // token expires in 15 minutes
    });
  };
// router.post('/forgot-password', async (req, res) => {
    
 const forgotPassword = async (req,res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const token = generateResetToken(user._id);
  
      const resetLink = `https://clearzone-zeta.vercel.app/reset-password/${token}`; // frontend link
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
  
      await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
      });
  
      res.json({ message: 'Reset link sent to email' });
    } catch (err) {
      res.status(500).json({ message: 'Error sending reset email', error: err.message });
    }
  };
// router.post('/reset-password/:token', async (req, res) => {
  const resetPassword = async (req,res) => {

    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.password = password; // triggers the pre-save hook for hashing
      await user.save();
  
      res.json({ message: 'Password reset successful' });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  };
  
module.exports ={ generateResetToken,forgotPassword,resetPassword};
