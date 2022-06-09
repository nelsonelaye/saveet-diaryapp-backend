const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filter = (req, file, cb) => {
  const ext = path.extname(file.originalname);

  if (ext !== ".jpg" || ext !== ".png" || ext !== "jpeg") {
    cb(new Error("File not supported"));
  } else {
    cb(null, true);
  }
};

const uploadAvatar = multer({
  storage: storage,

  fileSize: {
    limits: 1024 * 1024 * 10,
  },
}).single("avatar");

const uploadPhoto = multer({
  storage: photoStorage,

  fileSize: {
    limits: 1024 * 1024 * 10,
  },
}).single("photo");

module.exports = { uploadAvatar, uploadPhoto };
