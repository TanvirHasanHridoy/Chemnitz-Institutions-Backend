import express from "express";
import Jugendberufshilfen from "../models/Jugendberufshilfen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const jugendberufshilfens = await Jugendberufshilfen.find();
    res.json(jugendberufshilfens);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
