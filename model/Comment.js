const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
