import express from "express";
import Kindertageseinrichtungen from "../models/Kindertageseinrichtungen.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Fetch data from the database
    const kindertageseinrichtungens = await Kindertageseinrichtungen.find();

    // Iterate through each school
    const kindertageseinrichtungenWithType = kindertageseinrichtungens.map(
      (kindertageseinrichtungen) => {
        // Add the "TYPE" attribute to the properties object
        return {
          ...kindertageseinrichtungen.toObject(), // Convert Mongoose document to plain JavaScript object
          properties: {
            ...kindertageseinrichtungen.properties, // Keep existing properties
            TYPE: "Kindertageseinrichtungens", // Add the new "TYPE" attribute
          },
        };
      }
    );
    // Send the modified data as response
    res.json(kindertageseinrichtungenWithType);
  } catch (err) {
    // Handle errors
    res.status(500).send(err);
  }
});
export default router;
