const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const existUser = await user.findOne({ email: req.body.email });
    if (existUser) {
      res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new user(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const existEmail = await user.findOne({ email: req.body.email });
    if (!existEmail) {
      res.send({
        message: "Invalid Email",
        success: false,
        data: null,
      });
    }
    if(existEmail.isBlocked) {
      res.send({
        message: "Your Account is Blocked, Please contact admin",
        success: false,
        data: null
      })
    } 
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      existEmail.password
    );
    if (!matchedPassword) {
      res.send({
        message: "Incorrect Password",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ userId: existEmail._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.send({
      message: "Logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userData = await user.findById(req.body.userId);
    res.send({
      message: "User fetched successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).send({
      message: "User fetched successfully",
      data: users,
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

const updateUserPermission = async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      message: "User permission updated successfully",
      data: null,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "User permission failed",
      data: error,
      success: false,
    });
  }
};

exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.updateUserPermission = updateUserPermission;
