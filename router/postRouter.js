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
  likes,
  unlike,
  getlikes,
  getUnlikes,
  comment,
  view,
  getAllviews,
} = require("../controller/post");

// API #####################################################################################
router.route("/uploadPostPic").post(picturePost); // to check
router.route("/").get(allPosts);
router.route("/user").get(authenticateUser, allPostsFromOneUser);
router.route("/").get(allPosts);
router.route("/").post(authenticateUser, createPost);
router.route("/edit/:id").patch(authenticateUser, editPost);
router.route("/:id").delete(deletePost);
router.route("/:id").get(singlePost); // add auth just a person that logged in can see the post

module.exports = router;
