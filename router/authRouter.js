const express = require("express");
const router = express.Router();

// import controller
const { createUser, login, logout } = require("../controller/auth");

// ############## non - API ##########################
router.get("/signup", (req, res) => {
  res.render("registration");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.route("/signin").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
