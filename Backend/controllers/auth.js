const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { body, validationResult } = require("express-validator");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await User.findOne({ email: email });

  if (checkUser) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "User is Already registered" });
    return;
  }

  if (password?.search(/[A-Z]/) < 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "first letter of password shold be Capital" });
  }

  if (name?.trim().length < 5) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "User-Name length cannot be less than 5" });
    return;
  }

  const user = await User.create({ ...req.body });
  // console.log(user);
  const token = user.createJWT();
  // console.log("token", token);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  console.log("in login", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({ msg: "Please provide email and password" });
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ msg: "Invalid Credentials" });
    return;
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(404).json({ msg: "Invalid Credentials" });
    return;
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};

module.exports = {
  register,
  login,
};
