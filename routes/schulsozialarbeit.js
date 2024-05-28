import express from "express";
import Schulsozialarbeit from "../models/Schulsozialarbeit.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const schulsozialarbeits = await Schulsozialarbeit.find();
    res.json(schulsozialarbeits);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
