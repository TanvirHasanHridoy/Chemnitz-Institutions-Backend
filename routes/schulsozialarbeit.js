// Schulsozialarbeit;
// schulsozialarbeit;
// Schulsozialarbeits;

import express from "express";
import Schulsozialarbeit from "../models/Schulsozialarbeit.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch data from the database
    const schulsozialarbeits = await Schulsozialarbeit.find();

    // Iterate through each school
    const schulsozialarbeitWithType = schulsozialarbeits.map(
      (schulsozialarbeit) => {
        // Add the "TYPE" attribute to the properties object
        return {
          ...schulsozialarbeit.toObject(), // Convert Mongoose document to plain JavaScript object
          properties: {
            ...schulsozialarbeit.properties, // Keep existing properties
            TYPE: "Schulsozialarbeits", // Add the new "TYPE" attribute
          },
        };
      }
    );
    // Send the modified data as response
    res.json(schulsozialarbeitWithType);
  } catch (err) {
    // Handle errors
    res.status(500).send(err);
  }
});
export default router;
