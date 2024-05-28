import express from "express";
import Schulen from "../models/Schulen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const schulens = await Schulen.find();
    res.json(schulens);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
