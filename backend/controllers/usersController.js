const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
  cloudinaryRemoveImages,
} = require("../utils/cloudinary");
const fs = require("fs");

/**
 * @desc   Get All Users Profiles
 * @router /api/users/profile
 * @method GET
 * @access private (Only Admin)
 */
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**
 * @desc   Get User Profile By Id
 * @router /api/users/profile/:id
 * @method GET
 * @access public
 */
module.exports.getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.status(200).json(user);
});

/**
 * @desc   Update User Profile By Id
 * @router /api/users/profile/:id
 * @method PUT
 * @access private (Only Account Owner)
 */
module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");

  res.status(200).json(updatedUser);
});

/**
 * @desc   Get Users Count
 * @router /api/users/count
 * @method GET
 * @access private (Only Admin)
 */
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

/**
 * @desc   Profile Photo Upload
 * @router /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (Only Logged in User)
 */
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  // 1.Validation
  if (!req.file) {
    return res.status(400).json({ message: "No file provided!" });
  }

  // 2.Get the path of the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3.Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  console.log(result);

  // 4.Get the user from DB
  const user = await User.findById(req.user.id);

  // 5.Delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6.Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // 7.Send response to the client
  res.status(200).json({
    message: "Your profile photo uploaded successfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // 8.Remove images from the server
  fs.unlinkSync(imagePath);
});

/**
 * @desc   Delete User Profile
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private (Only Admin or Account Owner)
 */
module.exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  // 1. Get the user from DB
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  // 2. Get all posts from DB
  const posts = await Post.find({ user: user._id });

  // 3. Get the public ids from the posts
  const publicIds = posts?.map((post) => post.image.publicId);

  // 4. Delete all posts images from cloudinary that belong to this user
  if (publicIds?.length > 0) {
    await cloudinaryRemoveImages(publicIds);
  }

  // 5. Delete the profile photo from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6. Delete user's posts and comments
  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });

  // 7. Delete the user himself
  await User.findByIdAndDelete(req.params.id);

  // 8. Send a response to the client
  res.status(200).json({ message: "User has been deleted!" });
});
