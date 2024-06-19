import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/jwt_generator.js";

const router = express.Router();

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

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Middleware to authenticate JWT
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //   console.log("The authHeader is:", authHeader);
  console.log("called the auth middleware");
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
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
    res.status(401).json({ message: "Token is not valid" });
  }
};
export { auth };
export default router;
