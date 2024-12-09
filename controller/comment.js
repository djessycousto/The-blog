const Comment = require("../model/Comment");

const newComment = async (req, res) => {
  try {
    const { content, parentCommentId } = req.body;

    const newComment = new Comment({
      content,
      commentAuthor: req.user.userId,
      parentCommentId: parentCommentId || null,
    });

    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong ", error });
  }
};
const allComment = async (req, res) => {
  console.log("all comments");
  res.send("all comments");
};
const deleteComment = async (req, res) => {
  console.log("delete");
  res.send("delete");
};

module.exports = {
  newComment,
  allComment,
  deleteComment,
};
