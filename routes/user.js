import express from "express";
import User from "../models/User.js";

const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password, address, lat, lan } = req.body;
  //   console.log(name, email, password, address, lat, lan);
  // Simple validation
  if (!name || !email || !password || !address || !lat || !lan) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
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

    //    NEED TO ADD SALT AND HASH THE PASSWORD

    await user.save();

    res.json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
