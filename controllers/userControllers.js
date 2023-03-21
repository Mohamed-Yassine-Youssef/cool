const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { sendConfirmationEmail } = require("../nodemailer");

// sign up
const registerUser = asyncHandler(async (req, res) => {
  const chars =
    "0123456789azertyuiopqsdfghjklmwxcvbnWXCVBNQSDFGHJKLMAZERTYUIOP";
  let activationCode = "";
  for (i = 0; i < 25; i++) {
    activationCode += chars[Math.floor(Math.random() * chars.length)];
  }

  const { name, email, password, isRestorer } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isRestorer,
    activationCode: activationCode,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isRestorer: user.isRestorer,
      token: generateToken(user._id),
    });
    sendConfirmationEmail(user.email, user.activationCode);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// sign in
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && user.isActive) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isRestorer: user.isRestorer,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
  if (user && (await user.matchPassword(password)) && !user.isActive) {
    res.status(401);
    throw new Error("check your mailbox for activation");
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
// verify user
const VerifyUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    activationCode: req.params.activationcode,
  });

  if (user) {
    user.isActive = true;
    const updateUser = await user.save();
    res.json(updateUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// update user info
const updateUserIfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    const updateUser = await user.save();
    res.json(updateUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//get  user account by admin
const getUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
//update  user account by admin
const updateUserAccountByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;
    user.isRestorer = req.body.isRestorer;
    const updateUser = await user.save();
    res.json(updateUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//delete a user account by admin
const deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user removed" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
// update user password
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { oldPassword } = req.body;
  if (user) {
    if (await user.matchPassword(oldPassword)) {
      user.password = req.body.newPassword;
      const updateUser = await user.save();
      res.json(updateUser);
    } else {
      res.status(403);
      throw new Error("the old password is incorrect");
    }
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//get all users
const getUsers = asyncHandler(async (req, res) => {
  const Users = await User.find({});
  res.json(Users);
});

module.exports = {
  registerUser,
  authUser,
  updateUserIfo,
  updateUserPassword,
  getUsers,
  VerifyUserAccount,
  deleteUserAccount,
  getUserAccount,
  updateUserAccountByAdmin,
};
