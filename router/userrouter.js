const express = require("express");
const router = express.Router();

const {
  allUsers,
  singleUser,
  editUser,
  showCurrentUser, // this need to be double check
  deleteUser,
  updateUserPassword,
  pictureOfUser,
} = require("../controller/user");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

// #####  Non API route

// #####  API route

router.route("/").get(allUsers); // more roles can be pass here this is invoke directly therefore we return a function
router.route("/").get(allUsers); // more roles can be pass here this is invoke directly therefore we return a function
router.route("/dah/account").get(authenticateUser, showCurrentUser); // authenticateUser got the req.userinfo no need to query db
router.route("/uploadUserPic/:id").post(pictureOfUser);
router
  .route("/updateUser/:id")
  .patch(authenticateUser, authorizePermissions("Admin", "User"), editUser);
router
  .route("/updateUserPassword/:id")
  .patch(authenticateUser, updateUserPassword);

router.route("/:id").get(singleUser);
router.route("/:id").delete(authenticateUser, deleteUser);

module.exports = router;
