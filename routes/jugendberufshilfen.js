// Jugendberufshilfen
// jugendberufshilfen
// jugendberufshilfens

import express from "express";
import Jugendberufshilfen from "../models/Jugendberufshilfen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch data from the database
    const jugendberufshilfens = await Jugendberufshilfen.find();

    // Iterate through each school
    const JugendberufshilfenWithType = jugendberufshilfens.map(
      (jugendberufshilfen) => {
        // Add the "TYPE" attribute to the properties object
        return {
          ...jugendberufshilfen.toObject(), // Convert Mongoose document to plain JavaScript object
          properties: {
            ...jugendberufshilfen.properties, // Keep existing properties
            TYPE: "Jugendberufshilfens", // Add the new "TYPE" attribute
          },
        };
      }
    );
    // Send the modified data as response
    res.json(JugendberufshilfenWithType);
  } catch (err) {
    // Handle errors
    res.status(500).send(err);
  }
});
export default router;
