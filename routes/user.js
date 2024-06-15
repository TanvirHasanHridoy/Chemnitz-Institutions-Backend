import express from "express";
import User from "../models/User.js";
import { auth } from "./auth.js";

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

// UPDATE USER
// UPDATE USER
router.put("/updateuser/:id", auth, async (req, res) => {
  const { name, email, password, address, lat, lan } = req.body;
  try {
    // Ensure the user ID in the token matches the requested user ID
    console.log(req.params.id, req.user);
    if (req.params.id !== req.user._id) {
      return res.status(403).json({ msg: "Unauthorized to update this user" });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.NAME = name || user.NAME;
    user.EMAIL = email || user.EMAIL;
    user.PASSWORD = password || user.PASSWORD;
    user.HOME = {
      address: address || user.HOME.address,
      lat: lat || user.HOME.lat,
      lan: lan || user.HOME.lan,
    };

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error upadte");
  }
});

// DELETE USER
router.delete("/deleteuser/:id", auth, async (req, res) => {
  try {
    // console.log("Inside delete user");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (req.params.id !== req.user._id) {
      return res.status(403).json({ msg: "Unauthorized to delete this user" });
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

export default router;
