const mongoose = require("mongoose");

// Create a separate schema for likes
const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

// Create an index on postId, userId, and likes fields
likeSchema.index({ postId: 1, userId: 1 }, { index: true });

module.exports = mongoose.model("Like", likeSchema);
