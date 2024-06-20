import express from "express";
import User from "../models/User.js";
import { auth } from "./auth.js";
import generateToken from "../utils/jwt_generator.js";

const router = express.Router();
// @route   POST api/users
// @desc    Register a user
// @access  Public

// Protected Route
router.get("/protected", auth, (req, res) => {
  console.log("values");
  //   console.log(req.user);
  res.send("This is a protected route");
});

// Register a user
router.post("/createuser", async (req, res) => {
  const { name, email, password, address, lat, lan } = req.body;
  //   console.log(name, email, password, address, lat, lan);
  // Simple validation
  console.log(
    "Creating user with the following details:",
    name,
    email,
    password,
    address,
    lat,
    lan
  );

  if (!name || !email || !password || !address || !lat || !lan) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ EMAIL: email });

    if (user) {
      return res.status(402).json({ message: "User already exists" });
    }

    user = new User({
      NAME: name,
      EMAIL: email,
      PASSWORD: password,
      HOME: {
        address,
        lat,
        lan,
      },
    });
    console.log("Before save:", user.PASSWORD); // Add this line
    await user.save();
    console.log("After save:", user.PASSWORD); // Add this line

    res.status(201).json({
      message: "Registration was successful!",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("trying to login");
    const user = await User.findOne({ EMAIL: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id);
    console.log("Token:", token);
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      // Lifetime of the cookie in milliseconds, currently set to 60 minutes
      maxAge: 1000 * 60 * 60,
    });
    res.status(200).json({
      message: "Login was successful!",
      id: user._id,
      token,
    });
  } catch (err) {
    console.error("Having trouble logging in"); // Add this line
    console.error(err.message); // Add this line
    res.status(500).send("Server error");
  }
});

// GET USER
router.get("/getuser/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to view this user" });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// UPDATE USER
// UPDATE USER
router.put("/updateuser/:id", auth, async (req, res) => {
  const { name, email, password, address, lat, lan } = req.body;
  try {
    // Ensure the user ID in the token matches the requested user ID
    console.log(req.params.id, req.user);
    console.log("trying to update user");
    if (req.params.id !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let user1 = await User.findOne({ EMAIL: email });
    if (user1) {
      return res
        .status(400)
        .json({ message: "Email already exists or can't use this email" });
    }

    // if (user.EMAIL === email) {
    //   return res.status(400).json({ message: "Please add a different email" });
    // }

    // Update user fields
    if (name) user.NAME = name;
    if (email) user.EMAIL = email;
    if (password) user.PASSWORD = password;
    if (address || lat || lan) {
      user.HOME = {
        address: address || user.HOME.address,
        lat: lat || user.HOME.lat,
        lan: lan || user.HOME.lan,
      };
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.log("error occured in update user");
    // console.log(err);
    console.error(err.message);
    console.log("end of error");
    res.status(500).json({
      message: "Error occured at server side",
    });
  }
});

// DELETE USER
router.delete("/deleteuser/:id", auth, async (req, res) => {
  try {
    // console.log("Inside delete user");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }
    // console.log(user);
    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET FAVORITE LOCATION
router.get("/favorite/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to view this user" });
    }
    res.status(200).json({
      favorite: user.FAVORITE,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET HOME LOCATION
router.get("/home/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res.status(403).json({ msg: "Unauthorized to view this user" });
    }
    res.status(200).json({
      home: user.HOME,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ADD FAVORITE LOCATION

router.post("/favorite/:id", auth, async (req, res) => {
  const { address, lat, lan } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res.status(403).json({ msg: "Unauthorized to update this user" });
    }
    user.FAVORITE = {
      address,
      lat,
      lan,
    };
    await user.save();
    res.status(201).json({
      message: "Favorite location added successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
