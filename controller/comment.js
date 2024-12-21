const Comment = require("../model/Comment");
const Post = require("../model/Post");

const newComment = async (req, res) => {
  const postId = req.params.postId;
  try {
    const { content, parentCommentId } = req.body;

    if (!content) {
      console.log("Please file the form");
      return;
    }

    const newComment = new Comment({
      content,
      commentAuthor: req.user.userId,
      parentCommentId: parentCommentId || null,
      postId: postId,
    });

    console.log(newComment, "new comment");
    const comment = await newComment.save();

    console.log(comment, "comment");
    const post = await Post.findByIdAndUpdate(
      postId,

      { $push: { comments: comment._id } },
      { new: true }
    );

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
  const { postId, commentId } = req.params;
  const userId = req.user.userId;

  console.log(postId, userId, commentId, "all 3");

  try {
    // Check if the comment exists
    const commentExist = await Comment.findOne({
      _id: commentId,
      postId,
      commentAuthor: userId,
    });

    if (!commentExist) {
      return res
        .status(404)
        .json({ message: "Comment not found or does not belong to the post" });
    }

    // Remove the comment reference from the post
    await Post.updateOne(
      { _id: postId },
      { $pull: { comments: commentId } } // Remove the comment ID from the comments array
    );

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  newComment,
  allComment,
  deleteComment,
};
