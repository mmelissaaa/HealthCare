const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const config = require('../config/config');

// Create a GridFS storage engine
const storage = new GridFsStorage({
  url: config.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads' // Collection name in MongoDB
      };
      resolve(fileInfo);
    });
  }
});

// Initialize Multer with the storage engine
const upload = multer({ storage });

// Middleware for handling file uploads
exports.uploadFile = upload.single('file');

// Get a file from MongoDB
exports.getFile = async (filename) => {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });

  const file = await gfs.find({ filename }).toArray();
  if (!file || file.length === 0) {
    throw new Error('File not found');
  }

  return gfs.openDownloadStreamByName(filename);
};

// Delete a file from MongoDB
exports.deleteFile = async (filename) => {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });

  const file = await gfs.find({ filename }).toArray();
  if (!file || file.length === 0) {
    throw new Error('File not found');
  }

  await gfs.delete(file[0]._id);
  return true;
};