const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const {
 User,
 validateLoginUser,
 validateRegisterUser
} = require("../models/User");

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
    return res.status(400).json({message: error.details[0].message});
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

  //TODO - Sending Email(verify account)

  // Generate token
  const token = user.generateAuthToken();

  // make the user without password to send it in response
  const { password, ...userWithoutPassword } = user._doc;

  // send response to client
  res.status(201).json({ userWithoutPassword, token });
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
    return res.status(400).json({message: error.details[0].message});
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

  //TODO - Sending Email(verify account if not verified)

  // Generate token
  const token = user.generateAuthToken();

  // make the user without password to send it in response
  const { password, ...userWithoutPassword } = user._doc;

  // send response to client
  res.status(200).json({ userWithoutPassword, token });
});
