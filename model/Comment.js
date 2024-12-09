const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("comment", commentSchema);
