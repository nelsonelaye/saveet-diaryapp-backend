const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
    },

    avatarId: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    diary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "diaries",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
