const express = require("express");
const router = express.Router();

const {
  newComment,
  allComment,
  deleteComment,
} = require("../controller/comment");

router.route("/").post(newComment);
router.route("/").post(allComment);
router.route("/:id").post(deleteComment);
