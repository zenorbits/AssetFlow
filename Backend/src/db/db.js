require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AssetFlow" // ✅ only keep dbName
    });
    console.log("Connected to MongoDB Atlas ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;