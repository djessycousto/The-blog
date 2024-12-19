const Post = require("../model/Post");
const User = require("../model/User");
const {
  authenticateUserHasLogIn,
  authenticateUser,
} = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.use(authenticateUserHasLogIn);

// ##### non API #####

router.get("/", async (req, res) => {
  res.redirect("/home");
});
router.get("/home", async (req, res) => {
  // date

  try {
    const posts = await Post.find({}).populate("user").populate("comments");
    if (authenticateUser) {
      res.render("index", { user: req.user, posts });
    } else {
      console.log("issue with logic");
      res
        .status(500)
        .json({ message: "sorry an issue occured please try again later" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/article/:postId/:userId", authenticateUser, async (req, res) => {
  // console.log(req.user, "from non API insight-article ");
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById({ _id: postId })
      .populate("user")
      .populate("comments");

    const user = await User.find({ userId });

    if (!post) {
      // Handle the case where the post is not found
      console.error("Post not found");
      return res.status(404).send("Post not found");
    }

    res.render("insight", { post, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/about", async (req, res) => {
  try {
    if (authenticateUser) {
      res.render("about", { user: req.user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/contact", (req, res) => {
  try {
    if (authenticateUser) {
      res.render("contact", { user: req.user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
