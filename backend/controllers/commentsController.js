const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/Comment");
const { User } = require("../models/User");

/**
 * @desc   Create New Comment
 * @router /api/comments
 * @method POST
 * @access private(Only Logged in User)
 */
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);

  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }

  const userProfile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: userProfile.username,
  });

  res.status(201).json(comment);
});

/**
 * @desc   Get All Comments
 * @router /api/comments
 * @method GET
 * @access private(Only Admin)
 */
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user", ["-password"]);

  res.status(200).json(comments);
});

/**
 * @desc   Delete Comment
 * @router /api/comments/:id
 * @method DELETE
 * @access private(Only Admin and Comment's Owner)
 */
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted!" });
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to delete this comment" });
  }
});

/**
 * @desc   Update Comment
 * @router /api/comments/:id
 * @method PUT
 * @access private(Only Comment's Owner)
 */
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);

  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  if (req.user.id === comment.user.toString()) {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { text: req.body.text } },
      { new: true }
    );

    res.status(200).json(updatedComment);
  }else{
    res.status(403).json({message: "You are not allowed to edit this comment!"});
  }
});

