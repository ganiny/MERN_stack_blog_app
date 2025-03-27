const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
  deleteUserCtrl,
} = require("../controllers/usersController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserOnly,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const { photoUpload } = require("../middlewares/photoUpload");

// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserCtrl)
  .put(validateObjectId, verifyTokenAndUserOnly, updateUserCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload").post(verifyToken, photoUpload, profilePhotoUploadCtrl);

module.exports = router;
