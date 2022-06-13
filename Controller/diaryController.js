const diaryModel = require("../Model/diaryModel");
const userModel = require("../Model/userModel");
const cloudinary = require("cloudinary");

const createDiarywithPhoto = async (req, res) => {
  try {
    const { title, note } = req.body;

    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    // const result = await cloudinary.uploader.upload(req.file.path);
    const diary = await new diaryModel({
      // photo: result.secure_url,
      // photoId: result.public_id,
      title,
      note,
    });

    diary.user = user;
    diary.save();
    user.diary.push(diary);
    user.save();
    res.status(201).json({
      status: "Success",
      data: diary,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const createDiaryWithoutPhoto = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    const diary = await new diaryModel(req.body);

    diary.user = user;
    diary.save();
    user.diary.push(diary);
    user.save();

    res.status(201).json({
      status: "Success",
      data: diary,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getAllDiary = async (req, res) => {
  try {
    const diary = await diaryModel.find();
    res.status(200).json({
      status: "success",
      data: diary,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getOneDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await diaryModel.findById(diaryId);
    res.status(200).json({
      status: "success",
      data: diary,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updateDiarywithPhoto = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await diaryModel.findById(diaryId);
    const { title, note } = req.body;

    await cloudinary.uploader.destroy(diary.photoId);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newDiary = await diaryModel.findByIdAndUpdate(
      diaryId,

      { photo: result.secure_url, photoId: result.public_id, title, note },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: newDiary,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updateDiarywithoutPhoto = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await diaryModel.findById(diaryId);

    const newDiary = await diaryModel.findByIdAndUpdate(diaryId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: newDiary,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await diaryModel.findByIdAndDelete(diaryId);
    res.status(204).json({
      status: "success",
      message: "Diary deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
module.exports = {
  createDiarywithPhoto,
  createDiaryWithoutPhoto,
  getAllDiary,
  getOneDiary,
  updateDiarywithPhoto,
  updateDiarywithoutPhoto,
  deleteDiary,
};
