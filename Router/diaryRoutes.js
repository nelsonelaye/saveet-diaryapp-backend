const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../Util/multer");
const {
  createDiarywithPhoto,
  createDiaryWithoutPhoto,
  getAllDiary,
  getOneDiary,
  updateDiarywithPhoto,
  updateDiarywithoutPhoto,
  deleteDiary,
} = require("../Controller/diaryController");

router.post("/user/:userId/diary/photo", uploadPhoto, createDiarywithPhoto);
router.post("/user/:userId/diary", createDiaryWithoutPhoto);

router.get("/user/:userId/diary", getAllDiary);
router.patch("/diary/:diaryId/photo", uploadPhoto, updateDiarywithPhoto);

router
  .route("/user/:userId/diary/:diaryId")
  .get(getOneDiary)
  .patch(updateDiarywithoutPhoto)
  .delete(deleteDiary);

module.exports = router;
