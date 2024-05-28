import express from "express";
import axios from "axios";
import Schulen from "../models/Schulen.js";
import Schulsozialarbeit from "../models/Schulsozialarbeit.js";
import Kindertageseinrichtungen from "../models/Kindertageseinrichtungen.js";
import Jugendberufshilfen from "../models/Jugendberufshilfen.js";

const router = express.Router();

// ENDPOINT FOR UPDATING SCHULEN
router.get("/schulen", async (req, res) => {
  try {
    const apiUrl =
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    const processedData = response.data.features.map((item) => ({
      //   type: "Feature",
      geometry: {
        x: item.geometry.coordinates[0],
        y: item.geometry.coordinates[1],
      },
      properties: {
        OBJECTID: item.properties.OBJECTID,
        ID: item.properties.ID,
        ART: item.properties.ART,
        TYP: item.properties.TYP,
        STANDORTTYP: item.properties.STANDORTTYP,
        BEZEICHNUNG: item.properties.BEZEICHNUNG,
        BEZEICHNUNGZUSATZ: item.properties.BEZEICHNUNGZUSATZ,
        STRASSE: item.properties.STRASSE,
        PLZ: item.properties.PLZ,
        ORT: item.properties.ORT,
        TELEFON: item.properties.TELEFON,
        FAX: item.properties.FAX,
        EMAIL: item.properties.EMAIL,
        PROFILE: item.properties.PROFILE,
        SPRACHEN: item.properties.SPRACHEN,
        WWW: item.properties.WWW,
      },
      // Add more fields as needed
    }));

    // // Insert data into MongoDB
    // if (processedData.length > 0) {
    //   await Schulen.insertMany(processedData);
    //   res.send("Data inserted successfully");
    // } else {
    //   res.send("No data to insert");
    // }

    for (const item of processedData) {
      const exists = await Schulen.findOne({
        "properties.OBJECTID": item.properties.OBJECTID,
      });
      if (!exists) {
        await Schulen.create(item);
      }
    }

    res.status(200).json("Data processed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching or inserting data",
      message:
        "Additional message describing the error or providing further instructions.",
    });
  }
});

// ENDPOINT FOR UPDATING JUGENDBERUFSHILFEN
router.get("/Jugendberufshilfen", async (req, res) => {
  try {
    const apiUrl =
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    const processedData = response.data.features.map((item) => ({
      type: "Feature",
      geometry: {
        x: item.geometry.coordinates[0],
        y: item.geometry.coordinates[1],
      },
      properties: {
        OBJECTID: item.properties.OBJECTID,
        ID: item.properties.ID,
        TRAEGER: item.properties.TRAEGER,
        LEISTUNGEN: item.properties.LEISTUNGEN,
        BEZEICHNUNG: item.properties.BEZEICHNUNG,
        KURZBEZEICHNUNG: item.properties.KURZBEZEICHNUNG,
        STRASSE: item.properties.STRASSE,
        PLZ: item.properties.PLZ,
        ORT: item.properties.ORT,
        TELEFON: item.properties.TELEFON,
        EMAIL: item.properties.EMAIL,
        FAX: item.properties.FAX,
      },
    }));

    // // Insert data into MongoDB
    // if (processedData.length > 0) {
    //   await Schulen.insertMany(processedData);
    //   res.send("Data inserted successfully");
    // } else {
    //   res.send("No data to insert");
    // }

    for (const item of processedData) {
      const exists = await Jugendberufshilfen.findOne({
        "properties.OBJECTID": item.properties.OBJECTID,
      });
      if (!exists) {
        await Jugendberufshilfen.create(item);
      }
    }

    res.status(200).json("Data processed successfully for Jugendberufshilfen");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching or inserting data",
      message:
        "Additional message describing the error or providing further instructions.",
    });
  }
});

// ENDPOINT FOR UPDATING SCHULSOZIALARBEIT
router.get("/Schulsozialarbeit", async (req, res) => {
  try {
    const apiUrl =
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    const processedData = response.data.features.map((item) => ({
      type: "Feature",
      geometry: {
        x: item.geometry.coordinates[0],
        y: item.geometry.coordinates[1],
      },
      properties: {
        OBJECTID: item.properties.OBJECTID,
        ID: item.properties.ID,
        TRAEGER: item.properties.TRAEGER,
        LEISTUNGEN: item.properties.LEISTUNGEN,
        BEZEICHNUNG: item.properties.BEZEICHNUNG,
        KURZBEZEICHNUNG: item.properties.KURZBEZEICHNUNG,
        STRASSE: item.properties.STRASSE,
        PLZ: item.properties.PLZ,
        ORT: item.properties.ORT,
        TELEFON: item.properties.TELEFON,
        EMAIL: item.properties.EMAIL,
        FAX: item.properties.FAX,
      },
    }));

    // // Insert data into MongoDB
    // if (processedData.length > 0) {
    //   await Schulen.insertMany(processedData);
    //   res.send("Data inserted successfully");
    // } else {
    //   res.send("No data to insert");
    // }

    for (const item of processedData) {
      const exists = await Schulsozialarbeit.findOne({
        "properties.OBJECTID": item.properties.OBJECTID,
      });
      if (!exists) {
        await Schulsozialarbeit.create(item);
      }
    }

    res.status(200).json("Data processed successfully for Schulsozialarbeit");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching or inserting data",
      message:
        "Additional message describing the error or providing further instructions.",
    });
  }
});

// ENDPOINT FOR UPDATING KINDERTAGESEINRICHTUNGEN
router.get("/Kindertageseinrichtungen", async (req, res) => {
  try {
    const apiUrl =
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    const processedData = response.data.features.map((item) => ({
      type: "Feature",
      geometry: {
        x: item.geometry.coordinates[0],
        y: item.geometry.coordinates[1],
      },
      properties: {
        OBJECTID: item.properties.OBJECTID,
        ID: item.properties.ID,
        TRAEGER: item.properties.TRAEGER,
        // LEISTUNGEN:  item.properties.LEISTUNGEN,
        BEZEICHNUNG: item.properties.BEZEICHNUNG,
        KURZBEZEICHNUNG: item.properties.KURZBEZEICHNUNG,
        STRASSE: item.properties.STRASSE,
        STRSCHL: item.properties.STRSCHL,
        HAUSBEZ: item.properties.HAUSBEZ,
        PLZ: item.properties.PLZ,
        ORT: item.properties.ORT,
        HORT: item.properties.HORT,
        KITA: item.properties.KITA,
        URL: item.properties.URL,
        TELEFON: item.properties.TELEFON,
        FAX: item.properties.FAX,
        EMAIL: item.properties.EMAIL,
        BARRIEREFREI: item.properties.BARRIEREFREI,
        INTEGRATIV: item.properties.INTEGRATIV,
      },
    }));

    // // Insert data into MongoDB
    // if (processedData.length > 0) {
    //   await Schulen.insertMany(processedData);
    //   res.send("Data inserted successfully");
    // } else {
    //   res.send("No data to insert");
    // }

    for (const item of processedData) {
      const exists = await Kindertageseinrichtungen.findOne({
        "properties.OBJECTID": item.properties.OBJECTID,
      });
      if (!exists) {
        await Kindertageseinrichtungen.create(item);
      }
    }

    res
      .status(200)
      .json("Data processed successfully for Kindertageseinrichtungen");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching or inserting data",
      message:
        "Additional message describing the error or providing further instructions.",
    });
  }
});

export default router;
