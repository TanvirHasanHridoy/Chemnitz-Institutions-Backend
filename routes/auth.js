import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/jwt_generator.js";

const router = express.Router();

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
