const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

viewSchema.index({ postId: 1, userId: 1 }, { index: true });

module.exports = mongoose.model("view", viewSchema);
