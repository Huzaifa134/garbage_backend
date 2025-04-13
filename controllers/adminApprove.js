const User = require('../models/user.model');
const adminApprove =async  (req,res)  =>{
      const { userId, approve} = req.body;
    
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
        user.approve= approve?? user.approve;
        await user.save();
        res.status(200).json({ message: 'account approved successfully', user });
    }catch (error) {
        res.status(500).json({ message: 'Failed to update user access'});
      }

}


module.exports = {adminApprove}