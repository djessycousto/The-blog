const Like = require("../model/Like");
const Post = require("../model/Post");

const like = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    console.log(postId, "server");
    console.log(userId, "server");
    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId });

    if (!existingLike) {
      // If the user hasn't liked the post, increment the Like count
      //   const post = await Post.findByIdAndUpdate(
      //     postId,
      //     { $inc: { Like: 1 } },
      //     { new: true }
      //   );

      const like = await Like.create({ postId: postId, userId: userId });
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: like._id } }, // Add the like to the post
        { new: true }
      );

      // Add a new like record in the Like model
      //   const like = await Like.create({ postId, userId });

      res.json({ like }); // post.like??
    } else {
      // User has already liked the post, handle accordingly
      res.json({ message: "User has already liked the post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

const getLike = async (req, res) => {
  try {
    const like = await Like.find();
    res.status(200).json({ LikeNum: like.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUnLike = async (req, res) => {
  try {
    const like = await Like.find();
    res.status(200).json({ LikeNum: Like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unlike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      // If the user has liked the post, decrement the Like count
      const like = await Like.findOne({ postId, userId });
      console.log(like, "like in unlike");
      const post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { like: like._id } },
        { new: true }
      );

      // Remove the like record from the Like model
      const unLike = await Like.findOneAndDelete({ postId, userId });

      res.json({ unLike, msg: "unliked" });
    } else {
      // User hasn't liked the post, handle accordingly
      res.json({ message: "User has not liked the post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  like,
  getLike,
  getUnLike,
  unlike,
};

// note so with the like and unlike i can create a system that remove form like and adds to unlike for states
