const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ 
            status: "error",
            messages: "Password less than 6 characters"
        })
      }

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({
        status: "error",
        messages: "User already exist. Please Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      messages: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email: req.body.email });
    !user &&
      res.status(404).json({
        status: "error",
        messages: "User not found",
      });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(403).json({
        status: "error",
        messages: "Invalid credentials",
      });
    } else {
      res.status(200).json({
        status: "success",
        messages: "User logged in successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      messages: error.message,
    });
  }
});

module.exports = router;
