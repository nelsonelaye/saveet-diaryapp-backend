const express = require("express");
const routes = express.Router();
const { uploadAvatar, uploadPhoto } = require("../Util/multer");

const {
  getAllUsers,
  getOneUser,
  signUpUser,
  updateUser,
  updateUserAvatar,
  signInUser,
  deleteUser,
  deleteAllUsers,
} = require("../Controller/userController");

routes
  .route("/user")
  .get(getAllUsers)
  .post(uploadAvatar, signUpUser)
  .delete(deleteAllUsers);

routes.post("/user/login", signInUser);

routes
  .route("/user/:userId")
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);

routes.patch("/user/:userId/avatar", uploadAvatar, updateUserAvatar);

module.exports = routes;
