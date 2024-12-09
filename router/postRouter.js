const {
  authenticateUser,
  //   authorizePermissions,
} = require("../middleware/authentication");

const express = require("express");
const router = express.Router();
const {
  createPost,
  allPosts,
  allPostsFromOneUser,
  singlePost,
  editPost,
  picturePost,
  deletePost,
} = require("../controller/post");

const { like, getLike, getUnLike, unlike } = require("../controller/like");
const { view, getAllviews } = require("../controller/view");

// API #####################################################################################
router.route("/uploadPostPic").post(picturePost); // to check
router.route("/").get(allPosts);
router.route("/user").get(authenticateUser, allPostsFromOneUser);
router.route("/").get(allPosts);
router.route("/").post(authenticateUser, createPost);

// like
router.route("/:postId/likes").post(authenticateUser, like);
router.route("/:postId/unlikes").post(authenticateUser, unlike);

//View
router.route("/:postId/view").post(authenticateUser, view);
router.route("/:postId/getViews").post(authenticateUser, getAllviews);

// router.route("/view/:postId/:userId").post(authenticateUser, view);
// router.route("/view/:postId/:userId").get(authenticateUser, getAllviews);

router.route("/edit/:id").patch(authenticateUser, editPost);
router.route("/:id").delete(deletePost);
router.route("/:id").get(singlePost); // add auth just a person that logged in can see the post

module.exports = router;
