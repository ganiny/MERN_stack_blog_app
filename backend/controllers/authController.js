const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const {
  User,
  validateLoginUser,
  validateRegisterUser,
} = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**
 * @desc   Register New User
 * @router /api/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Is user already exist
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User is alreay existed!" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // new user
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // save it to db
  await user.save();

  // Create New Verification Token & save it to DB
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  // Making the link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  // Putting the link into an html template
  const htmlTemplate = `<a href="${link}">Click here to verify your account</a>`;

  // Sending email to the user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // send response to client
  res.status(201).json({
    message: "We sent you an email, please verify your email address",
  });
});

/**
 * @desc   Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 */
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Is user already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email or Password!" });
  }

  // compare password from client and password in database
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid Email or Password!" });
  }

  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }
    // Making the link
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    // Putting the link into an html template
    const htmlTemplate = `<a href="${link}">Click here to verify your account</a>`;

    // Sending email to the user
    await sendEmail(user.email, "Verify Your Email", htmlTemplate);

    return res.status(400).json({
      message: "We sent you an email, please verify your email address",
    });
  }

  // Generate token
  const token = user.generateAuthToken();

  // make the user without password to send it in response
  const { password, ...userWithoutPassword } = user._doc;

  // send response to client
  res.status(200).json({ userWithoutPassword, token });
});

/**
 * @desc   Verify User Account
 * @router /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 */
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
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

  user.isAccountVerified = true;
  await user.save();

  await verificationToken.deleteOne();

  res.status(200).json({ message: "Your account verified" });
});
