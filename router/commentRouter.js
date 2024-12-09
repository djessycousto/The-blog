const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateUserHasLogIn,
} = require("../middleware/authentication");

const {
  newComment,
  allComment,
  deleteComment,
} = require("../controller/comment");

router.route("/").post(authenticateUser, allComment);
router.route("/:postId/comment").post(authenticateUser, newComment);
router.route("/:postId/comment").post(authenticateUser, deleteComment);

module.exports = router;
