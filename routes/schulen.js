import express from "express";
import Schulen from "../models/Schulen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch data from the database
    const schulens = await Schulen.find();

    // Iterate through each school
    const schulensWithType = schulens.map((schulen) => {
      // Add the "TYPE" attribute to the properties object
      return {
        ...schulen.toObject(), // Convert Mongoose document to plain JavaScript object
        properties: {
          ...schulen.properties, // Keep existing properties
          TYPE: "Schulens", // Add the new "TYPE" attribute
        },
      };
    });
    // Send the modified data as response
    res.json(schulensWithType);
  } catch (err) {
    // Handle errors
    res.status(500).send(err);
  }
});
export default router;
