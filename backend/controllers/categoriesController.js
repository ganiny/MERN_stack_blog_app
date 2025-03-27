const asyncHandler = require("express-async-handler");
const { Category, validateCreateCategory } = require("../models/Category");

/**
 * @desc   Create New Category
 * @router /api/categories
 * @method POST
 * @access private(Only Admin)
 */
module.exports.createNewCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let category = await Category.findOne({ title: req.body.title });
  if (category) {
    return res.status(400).json({ message: "Category is already existed!" });
  }

  category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(category);
});

/**
 * @desc   Get All Categories
 * @router /api/categories
 * @method GET
 * @access public
 */
module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

/**
 * @desc   Delete Category By Id
 * @router /api/categories/:id
 * @method DELETE
 * @access private(Only Admin)
 */
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category is not found!" });
  }
  await Category.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({
      message: "Category has been deleted successfully!",
      categoryId: category._id,
    });
});
