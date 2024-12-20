const Like = require("../model/Like");
const Post = require("../model/Post");

// const like = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.user.userId;

//     // Check if the user has already liked the post
//     const existingLike = await Like.findOne({ postId, userId });

//     console.log(existingLike, "existing like");

//     if (!existingLike) {
//       const like = await Like.create({ postId, userId });
//       const post = await Post.findByIdAndUpdate(
//         postId,
//         { $push: { likes: like._id } }, // Add the like to the post
//         { new: true }
//       );

//       // Add a new like record in the Like model
//       //   const like = await Like.create({ postId, userId });

//       res.json({ like }); // post.like??
//     } else {
//       console.log(existingLike, "existing like else");

//       // User has already liked the post, handle accordingly
//       res.json({ message: "User has already liked the post" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error", error });
//   }
// };

////////////////////////////

const like = async (req, res) => {
  try {
    const postId = req.params.postId; // The ID of the post being liked
    const userId = req.user.userId; // The ID of the currently logged-in user

    // Step 1: Check if the user has already liked this specific post
    const existingLike = await Like.findOne({ postId, userId });

    if (!existingLike) {
      // Step 2: If not, create a new like entry in the Like collection
      const like = await Like.create({ postId, userId });

      // Step 3: Add this like to the post's likes array (note this is post-specific)
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: like._id } }, // Add the like to the post
        { new: true }
      );

      // console.log(like);
      // Step 4: Respond with the like object (you can also return the updated post if needed)
      res.json({ like });
    } else {
      console.log(existingLike);
      // Step 5: If the user already liked the post, return a message
      res.json({ message: "User has already liked the post" });
    }
  } catch (error) {
    // Step 6: Catch any errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

///////////////////////////////

const getLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const like = await Like.find({ postId });

    console.log(like, "from get like");
    res.status(200).json({ LikeNum: like.length, like });
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
        { $pull: { likes: like._id } },
        { new: true }
      );

      // Remove the like record from the Like model
      const unLike = await Like.findOneAndDelete({ postId, userId });

      console.log(unLike, "unliked");
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
