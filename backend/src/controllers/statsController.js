const User = require('../models/User');
const Task = require('../models/Task');

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const tasksByStatus = await Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
    const tasksByUser = await Task.aggregate([{ $group: { _id: "$user", count: { $sum: 1 } } }]);
    res.status(200).json({
      success: true,
      data: { totalUsers, totalTasks, tasksByStatus, tasksByUser }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
