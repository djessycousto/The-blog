const Post = require("../model/Post");
const User = require("../model/User");
// const {
//   authenticateUserHasLogIn,
//   authenticateUser,
// } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

// router.use(authenticateUser);
// ##### non API #####

// router.get("/test", (req, res) => {
//   try {
//     res.render("test");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/home", (req, res) => {
//   // res.send("Test route is working!");
//   console.log("short home");
//   res.render("index");
// });

// router.get("/home", async (req, res) => {
//   // date

//   try {
//     if (authenticateUserHasLogIn) {
//       console.log("user is logged");
//       console.log(req.user);
//       res.render("index", { user: req.user });
//     } else {
//       console.log("issue with logic");
//       // Redirect to login if not logged in
//       // res.redirect('/login');
//     }

//     res.render("index");
//     // res.render("index");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/article/:postId/:userId", authenticateUser, async (req, res) => {
//   console.log(req.user, "from non API insight-article ");
//   try {
//     const { postId, userId } = req.params;
//     const post = await Post.findById({ _id: postId }).populate("user");

//     if (!post) {
//       // Handle the case where the post is not found
//       console.error("Post not found");
//       return res.status(404).send("Post not found");
//     }

//     res.render("insight", { post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/test", (req, res) => {
//   res.send("Test route is working!");
//   res.render("insight");
// });

// router.get("/test", (req, res) => {
//   try {
//     res.render("test");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// router.get("/contact", (req, res) => {
//   try {
//     res.render("contact");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
