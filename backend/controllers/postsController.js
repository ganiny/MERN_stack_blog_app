const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const {
  Post,
  validateCreatePost,
  validateUpdatPost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/**
 * @desc   Create New Post
 * @router /api/posts
 * @method POST
 * @access private(Only Logged in User)
 */
module.exports.createNewPostCtrl = asyncHandler(async (req, res) => {
  // Validation for image
  if (!req.file) {
    return res.status(400).json({ message: "No image provided!" });
  }

  // Validation for data
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }

  // Upload photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Create new post and save it to DB
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Send response to the client
  res.status(201).json(post);

  // Remove image from the server
  fs.unlinkSync(imagePath);
});

/**
 * @desc   Get All Posts
 * @router /api/posts
 * @method GET
 * @access public
 */
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const { pageNumber, category } = req.query;
  const POSTS_PER_PAGE = 3;
  let posts;
  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POSTS_PER_PAGE)
      .limit(POSTS_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

/**
 * @desc   Get Single Post
 * @router /api/posts/:id
 * @method GET
 * @access public
 */
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["-password"])
    .populate("comments");
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  res.status(200).json(post);
});

/**
 * @desc   Get Posts Count
 * @router /api/posts/count
 * @method GET
 * @access public
 */
module.exports.getPostsCountCtrl = asyncHandler(async (req, res) => {
  const postsCount = await Post.countDocuments();
  res.status(200).json(postsCount);
});

/**
 * @desc   Delete Post
 * @router /api/posts/:id
 * @method DELETE
 * @access private(Only Admin or Account Owner)
 */
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await cloudinaryRemoveImage(post.image.publicId);

    await Post.findByIdAndDelete(req.params.id);

    // Delete Comments for this post
    await Comment.deleteMany({postId: post._id});

    return res
      .status(200)
      .json({ message: "Post has been deleted!", postId: post._id });
  } else {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this post!" });
  }
});

/**
 * @desc   Update Post
 * @router /api/posts/:id
 * @method PUT
 * @access private(Only Account Owner)
 */
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // Validation for data
  const { error } = validateUpdatPost(req.body);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  }

  // Check if the post exist in DB or not
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // Check if the user is the owner of the post or not
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "You are not allowed to modify this post!" });
  }

  // Update Post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]).populate("comments");

  // Send response to the client
  res.status(200).json(updatedPost);
});

/**
 * @desc   Update Post Image
 * @router /api/posts/update-image/:id
 * @method PUT
 * @access private(Only Account Owner)
 */
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  // Validation for image
  if (!req.file) {
    return res.status(400).json({ message: "No image provieded!" });
  }

  // Check if the post exist in DB or not
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // Check if the user is the owner of the post or not
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "You are not allowed to modify this post!" });
  }

  // Update Post Image:
  // Delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  // Upload the new image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Update the image field in DB
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // Send response to the client
  res.status(200).json(updatedPost);

  // Remove image from the server
  fs.unlinkSync(imagePath);
});

/**
 * @desc   Toggle Likes
 * @router /api/posts/like/:id
 * @method PUT
 * @access private(Only Logged in users)
 */
module.exports.toggleLikesCtrl = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user.id;
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  const isPostAlreadyLikedFromSpecificUser = post.likes.find(
    (userId) => userId.toString() === loggedInUserId
  );

  if (isPostAlreadyLikedFromSpecificUser) {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: loggedInUserId,
        },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          likes: loggedInUserId,
        },
      },
      { new: true }
    );
  }
  res.status(200).json(post);
});
