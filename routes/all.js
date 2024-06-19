import express from "express";
import Jugendberufshilfen from "../models/Jugendberufshilfen.js";
import Kindertageseinrichtungen from "../models/Kindertageseinrichtungen.js";
import Schulen from "../models/Schulen.js";
import Schulsozialarbeit from "../models/Schulsozialarbeit.js";
import mongoose from "mongoose";

const router = express.Router();

// GET ALL DATA
router.get("/", async (req, res) => {
  try {
    const jugendberufshilfens = await Jugendberufshilfen.find();
    const kindertageseinrichtungens = await Kindertageseinrichtungen.find();
    const schulens = await Schulen.find();
    const schulsozialarbeits = await Schulsozialarbeit.find();

    const modifiedJugendberufshilfens = jugendberufshilfens.map(
      (jugendberufshilfen) => ({
        ...jugendberufshilfen.toObject(),
        properties: {
          ...jugendberufshilfen.properties,
          TYPE: "Jugendberufshilfens",
        },
      })
    );

    const modifiedKindertageseinrichtungens = kindertageseinrichtungens.map(
      (kindertageseinrichtungen) => ({
        ...kindertageseinrichtungen.toObject(),
        properties: {
          ...kindertageseinrichtungen.properties,
          TYPE: "Kindertageseinrichtungens",
        },
      })
    );

    const modifiedSchulens = schulens.map((schulen) => ({
      ...schulen.toObject(),
      properties: {
        ...schulen.properties,
        TYPE: "Schulens",
      },
    }));

    const modifiedSchulsozialarbeits = schulsozialarbeits.map(
      (schulsozialarbeit) => ({
        ...schulsozialarbeit.toObject(),
        properties: {
          ...schulsozialarbeit.properties,
          TYPE: "Schulsozialarbeits",
        },
      })
    );

    const combinedData = [
      ...modifiedJugendberufshilfens,
      ...modifiedKindertageseinrichtungens,
      ...modifiedSchulens,
      ...modifiedSchulsozialarbeits,
    ];

    // console.log(combinedData);
    res.status(200).send(combinedData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET DATA BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  try {
    const collections = [
      Jugendberufshilfen,
      Kindertageseinrichtungen,
      Schulen,
      Schulsozialarbeit,
    ];
    let foundDoc = null;

    for (const collection of collections) {
      foundDoc = await collection.findById(id);
      if (foundDoc) {
        break;
      }
    }

    if (foundDoc) {
      res.status(200).json(foundDoc);
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
