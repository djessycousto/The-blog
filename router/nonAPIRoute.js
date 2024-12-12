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
router.get("/home", async (req, res) => {
  // date

  try {
    const posts = await Post.find({}).populate("user").populate("comments");
    console.log(posts, "/home");
    if (authenticateUser) {
      console.log("user is logged");
      console.log(req.user, "from non API");
      res.render("index", { user: req.user, posts });
    } else {
      console.log("issue with logic");
      // Redirect to login if not logged in
      // res.redirect('/login');
    }

    // res.render("index");
    // res.render("index");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// // Define the '/home' route
// router.get("/home", async (req, res) => {
//   try {
//     // The middleware authenticateUserHasLogIn has already set req.user
//     if (req.user) {
//       // If req.user is available, user is logged in
//       console.log("User is logged");
//       console.log(req.user); // Print user details (set by middleware)
//       res.render("index", { user: req.user }); // Render the page with user data
//     } else {
//       console.log("User not logged in");
//       // res.redirect("/home"); // Redirect to login if no user is logged in
//       res.render("index"); // Render the page with user data
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/article/:postId/:userId", authenticateUser, async (req, res) => {
  // console.log(req.user, "from non API insight-article ");
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById({ _id: postId })
      .populate("user")
      .populate("comments");

    if (!post) {
      // Handle the case where the post is not found
      console.error("Post not found");
      return res.status(404).send("Post not found");
    }
    const user = req.user;
    res.render("insight", { post, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/test", (req, res) => {
  const testVar = "Hello, EJS!";
  const urlR = "test url";
  const x = "test x";
  res.render("test", { testVar, x, urlR });
});

router.get("/about", (req, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/contact", (req, res) => {
  try {
    res.render("contact");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
