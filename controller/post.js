const Post = require("../model/Post");
// const Comments = require("../models/Comments");
// const View = require("../models/Views");
// const Likes = require("../models/Likes");
const path = require("path");

// one attache user id //  is on cookie

const createPost = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const post = await Post.create(req.body);
    res.status(201).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const allPostsFromOneUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const posts = await Post.find({ user: userId });
    res.status(200).json({ Qt: posts.length, posts });
  } catch (error) {
    console.log(error);
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .select("-password")
      .populate("user") // Populate user details
      .populate("likes", "userId timestamp") // Populate likes details
      .populate("comments") // Populate comments
      .populate({
        path: "comments",
        populate: {
          path: "commentAuthor",
          select: "name", // Only return the name field
        },
      })
      .exec();

    // console.log(JSON.stringify(posts, null, 2, "striingyfy")); // View the expanded output

    //   .populate("comments") // Populate comments first
    //   .populate({
    //     path: "comments",
    //     populate: {
    //       path: "commentAuthor",
    //       select: "name",
    //     },
    //   });
    // .exec();

    console.log(posts, "from posts controller");

    // .populate({
    //   path: "comments", // Access the comments array
    //   populate: {
    //     path: "commentAuthor", // Populate commentAuthor within comments
    //     select: "name", // Fetch only the 'name' field
    //   },
    // });
    // mongoose.set("debug", true);

    // Populate likes details
    // console.log(posts, " from post");
    res.status(200).json({ Qt: posts.length, posts });
  } catch (error) {
    console.log(error);
  }
};

// good one use this
const singlePost = async (req, res) => {
  try {
    // const userId = req.user.userId;
    const { id: postId } = req.params;
    const post = await Post.findOne({ _id: postId })
      .populate({
        path: "likes",
      })
      .populate({
        path: "comments",
      })
      .exec(); // add view and comment
    // check if not product
    // console.log(post, "controller");
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      new: true,
      runValidators: true,
    }); // add view and comment
    // check if not product
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const picturePost = async (req, res) => {
  if (
    !req.files ||
    !req.files.postPicture ||
    req.files.postPicture.length === 0
  ) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const postPicture = req.files.postPicture; // Assuming you're handling the first file in the array

  if (!postPicture.mimetype.startsWith("image")) {
    console.log("Please upload an image");
    return res.status(400).json({ error: "Please upload an image" });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${postPicture.name}`
  );

  try {
    await postPicture.mv(imagePath);
    const response = {
      postPicture: {
        name: postPicture.name,
        mimetype: postPicture.mimetype,
        size: Math.ceil(postPicture.size / (1024 * 1024)) + "Mo",
        path: `/uploads/${postPicture.name}`,
      },
    };

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error moving file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deletePost = async (req, res) => {
  // res.send("delete"); this is an other way of deleting

  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    console.log("no post find, no delete");
  }
  await post.deleteOne(); // remove is causing trouble find why????
  res.status(200).json({ msg: "deleted" });
};

module.exports = {
  createPost,
  allPosts,
  allPostsFromOneUser,
  singlePost,
  editPost,
  picturePost,
  deletePost,
};
