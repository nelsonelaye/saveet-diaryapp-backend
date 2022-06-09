const mongoose = require("mongoose");
const schema = mongoose.Schema
const diarySchema = new schema (
  {
    photo: {
      type: String,
    },
    photoId: {
      type: String,
    },
    title: {
      type: String,
    },
    note: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("diaries", diarySchema);
