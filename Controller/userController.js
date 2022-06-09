const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../Util/cloudinary");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("diary");

    if (users.length <= 0) {
      res.json({
        message: "No users yet",
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: users,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId).populate("diary");
    if (!user) {
      res.json({
        message: `user does not exist`,
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: user,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const signUpUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const currentUser = await userModel.findOne({ email });

    if (currentUser) {
      res.json({
        message: `User with this email already exist`,
      });
    } else {
      //upload avatar to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      //finally create user
      const user = await userModel.create({
        avatar: result.secure_url,
        avatarId: result.public_id,
        fullname,
        email,
        password: hashed,
      });

      res.status(201).json({
        status: "Success",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
    console.log(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (user) {
      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        res.json({
          message: "Password is incorrect",
        });
      } else {
        const genToken = await jwt.sign(
          {
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            avatar: user.avatar,
            avatarId: user.avatarId,
          },
          "TOKENIZE",
          { expiresIn: "1d" }
        );

        const { password, ...rest } = user._doc;

        res.status(200).json({
          status: "Success",
          data: { genToken, ...rest },
        });
      }
    } else {
      res.json({
        message: "Email is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullname } = req.body;
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    //update text content
    const newUser = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    await cloudinary.uploader.destroy(user.avatarId);

    const result = await cloudinary.uploader.upload(req.file.path);
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
        avatar: result.secure_url,
        avatarId: result.public_id,
      },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findByIdAndDelete(userId);
    res.status(204).json({
      status: "Success",
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await userModel.deleteMany();
    const user = await userModel.find();
    res.status(200).json({
      status: "Success",
      message: "All users deleted",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  signUpUser,
  signInUser,
  updateUser,
  updateUserAvatar,
  deleteUser,
  deleteAllUsers,
};
