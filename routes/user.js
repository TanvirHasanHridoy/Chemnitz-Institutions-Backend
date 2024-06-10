import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/jwt_generator.js";

const router = express.Router();
// @route   POST api/users
// @desc    Register a user
// @access  Public

// CREATE USER
router.post("/createuser", async (req, res) => {
  const { name, email, password, address, lat, lan } = req.body;
  //   console.log(name, email, password, address, lat, lan);
  // Simple validation
  if (!name || !email || !password || !address || !lat || !lan) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ EMAIL: email });

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
    const user = await User.findOne({ EMAIL: email });
    if (!user) {
      return res.status(400).send("Invalid username");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    const token = generateToken(user._id);
    console.log("Token:", token);
    res.status(200).json({
      message: "Login was successful!",
      id: user._id,
      token,
    });
  } catch (err) {
    console.error(err.message); // Add this line
    res.status(500).send("Server error");
  }
});

// Middleware to authenticate JWT
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   console.log("The authHeader is:", authHeader);

  if (!authHeader) {
    return res.status(401).send("No token, authorization denied");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("deoecoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("The error is here:");
    console.log(err);
    res.status(401).send("Token is not valid");
  }
};

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
