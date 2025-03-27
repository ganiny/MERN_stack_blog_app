const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const { photoUpload } = require("../middlewares/photoUpload");
const {
  createNewPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikesCtrl,
} = require("../controllers/postsController");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload, createNewPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostsCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

// /api/posts//update-image/:id
router
  .route("/update-image/:id")
  .put(validateObjectId, verifyToken, photoUpload, updatePostImageCtrl);

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikesCtrl);

module.exports = router;
