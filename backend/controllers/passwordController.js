const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User, validateEmail, validateNewPassword } = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc   Send Reset Password Link
 * @router /api/password/reset-password-link
 * @method POST
 * @access public
 */
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the user from DB by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User with given email doesn't exist!" });
  }

  // Creating verificationToken
  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }

  // Creating link
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;

  // Creating HTML template
  const htmlTemplate = `<a href="${link}">Click here to reset your password</a>`;

  // Sending Email
  await sendEmail(user.email, "Reset Your Password", htmlTemplate);

  // Send Response to the client
  res.status(200).json({ message: "Reset-Password link sent to your email" });
});

/**
 * @desc   Get Reset Password Link
 * @router /api/password/reset-password/:userId/:token
 * @method GET
 * @access public
 */
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link" });
  }

  res.status(200).json({ message: "Valid link" });
});

/**
 * @desc   Reset Password
 * @router /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 */
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the user from DB by id
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link" });
  }

  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }
  
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();
  await verificationToken.deleteOne();

  res.status(200).json({message: "Password has been reset successfully, please login"});
});
