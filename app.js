const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// MongoDB connection string
const mongoUri = "mongodb://localhost:27017/Chemnitz-Institution__";

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema for Schulen
const schulenSchema = new mongoose.Schema({
  type: {
    type: "String",
    default: "Feature",
  },
  id: "number",
  geometry: {
    x: "Number",
    y: "Number",
  },
  properties: {
    OBJECTID: "Number",
    ID: "Number",
    TYP: "Number",
    ART: "String",
    STANDORTTYP: "Number",
    BEZEICHNUNG: "String",
    BEZEICHNUNGZUSATZ: "String",
    STRASSE: "String",
    PLZ: "String",
    ORT: "String",
    TELEFON: "String",
    FAX: "String",
    EMAIL: "String",
    PROFILE: "String",
    SPRACHEN: "String",
    WWW: "String",
  },
});

const DataModel = mongoose.model("Schulens", schulenSchema);

// Define a route to fetch data from the external API and save it to MongoDB
app.get("/fetch-data", async (req, res) => {
  try {
    // Example API URL
    const apiUrl =
      "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

    // Fetch data from the API
    const response = await axios.get(apiUrl);

    console.log("########### The basic datas are as follows:");
    // console.log(response.data);
    console.log(response.data.features[0]);
    // console.log("x cord is available :" + response.geometry.coordinates[0]);
    // console.log(
    //   "Obj id is is available :" + response.features.properties.OBJECTID
    // );
    // Process the data
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
    //   await DataModel.insertMany(processedData);
    //   res.send("Data inserted successfully");
    // } else {
    //   res.send("No data to insert");
    // }

    for (const item of processedData) {
      const exists = await DataModel.findOne({
        "properties.OBJECTID": item.properties.OBJECTID,
      });
      if (!exists) {
        await DataModel.create(item);
      }
    }

    res.send("Data processed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching or inserting data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
