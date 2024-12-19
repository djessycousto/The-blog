// const mongoose = require("mongoose");
const User = require("../model/User");
// const jwt = require("jsonwebtoken");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const createUser = async (req, res) => {
  try {
    // check for a unique email in controller
    const { name, email, password, aboutTheUser } = req.body;
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      res.status(400).json({ msg: "Email already exist" });
      return;
    }

    // check if it the first doc
    const isTheFirstDoc = (await User.countDocuments({})) === 0;
    // console.log("Document count:", await User.countDocuments({}));
    // console.log("isTheFirstDoc:", isTheFirstDoc);
    const role = isTheFirstDoc ? "Admin" : "User";

    const user = await User.create({
      name,
      email,
      password,
      role,
      aboutTheUser,
    });

    //===> create JWT <======///

    const tokenUser = {
      name: user.name,
      userId: user._id,
      role: user.role,
      aboutTheUser: user.aboutTheUser,
    };
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(201).json({ user: tokenUser, msg: "User created" });
  } catch (error) {
    // console.log(error);
    res.json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide the correct credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: " Credentials Invalid" });
    }
    // check Password

    const isPasswordCorrect = await user.comparePassword(password); // user that find the email (email gives the user with pass)
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: " Credentials Invalid" });
    }
    // if okay then token attach cookies

    // const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const tokenUser = createTokenUser(user);
    // console.log(tokenUser);

    // Check if there is a redirect query parameter in the request
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(200).json({ user: tokenUser }); // redirect here
  } catch (error) {
    console.log(error, "login error controller");
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: "user logged out" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "user logged out" });
  }
};

module.exports = {
  createUser,
  login,
  logout,
};
