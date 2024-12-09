const View = require("../model/View");
const Post = require("../model/Post");

const view = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const userId = req.user.userId;

    const viewAlreadyExist = await View.findOne({ postId, userId });

    if (viewAlreadyExist) {
      console.log("user already view this post");
      res.status(409).json({ msg: "This post is already viewed by the user " });
    } else {
      // create
      const view = await View.create({ postId: postId, userId: userId });
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { views: view._id } },
        { new: true }
      );

      console.log(view._id, "views");

      res.status(201).json({ view: view, msg: "user just view this post" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

const getAllviews = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    // Check if the user has already viewed the post
    const view = await View.find(); // get buy post

    res.status(200).json({ userView: view, numberOfView: view.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  view,
  getAllviews,
};
