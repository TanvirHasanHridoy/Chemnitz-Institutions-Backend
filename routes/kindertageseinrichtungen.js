import express from "express";
import Kindertageseinrichtungen from "../models/Kindertageseinrichtungen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const kindertageseinrichtungens = await Kindertageseinrichtungen.find();
    res.json(kindertageseinrichtungens);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
