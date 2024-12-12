const mongoose = require("mongoose");

// Create a separate schema for likes
const likeSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  timestamp: { type: Date, default: Date.now },
});

// Create an index on postId, userId, and likes fields
// likeSchema.index({ userId: 1  }, { index: true }); wrong
likeSchema.index({ postId: 1, userId: 1 }, { unique: true }); // Unique combination

// console.log(likeSchema);

module.exports = mongoose.model("Like", likeSchema);
