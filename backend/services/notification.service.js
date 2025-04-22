const Notification = require('../models/Notification');

// Send a notification
exports.sendNotification = async ({ recipient, title, message, type, relatedData }) => {
  try {
    const notification = new Notification({
      recipient,
      title,
      message,
      type,
      relatedData
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error('Send notification error:', error);
    throw error;
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error('Get user notifications error:', error);
    throw error;
  }
};

// Mark a notification as read
exports.markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.status = 'read';
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Mark as read error:', error);
    throw error;
  }
};