const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  timestamp: { type: Date, default: Date.now },
});

viewSchema.index({ postId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("View", viewSchema);
