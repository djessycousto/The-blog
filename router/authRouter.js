const express = require("express");
const router = express.Router();

// import controller
const { createUser, login, logout } = require("../controller/auth");
const {
  authenticateUser,
  authenticateUserHasLogIn,
} = require("../middleware/authentication");

// ############## non - API ##########################
router.get("/signup", (req, res) => {
  res.render("registration");
});

//   router.get("/login", authenticateUserHasLogIn, (req, res) => {
//     res.render("login");
//   });

router.get("/login", (req, res) => {
  res.render("login");
});

// router.get("/dash", authenticateUser, (req, res) => {
//   if (!req.user) {
//     console.log("sorry login first ");
//   } else {
//     console.log(req.user);
//   }
//   res.status(200).render("dash", {});
// });

router.route("/signin").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
