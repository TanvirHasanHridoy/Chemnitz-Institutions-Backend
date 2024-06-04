import express from "express";
import Jugendberufshilfen from "../models/Jugendberufshilfen.js";
import Kindertageseinrichtungen from "../models/Kindertageseinrichtungen.js";
import Schulen from "../models/Schulen.js";
import Schulsozialarbeit from "../models/Schulsozialarbeit.js";

const router = express.Router();

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

export default router;
