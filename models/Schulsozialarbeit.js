import mongoose from "mongoose";

const SchulsozialarbeitSchema = new mongoose.Schema(
  {
    properties: {
      OBJECTID: {
        type: Number,
        unique: true,
      },
      ID: {
        type: Number,
        unique: true,
      },
      TRAEGER: String,
      LEISTUNGEN: String,
      BEZEICHNUNG: String,
      KURZBEZEICHNUNG: String,
      STRASSE: String,
      PLZ: String,
      ORT: String,
      TELEFON: String,
      EMAIL: String,
      FAX: String,
    },
    geometry: {
      x: "Number",
      y: "Number",
    },
    type: {
      type: "String",
      default: "Feature",
    },
    id: "Number",
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schulsozialarbeit", SchulsozialarbeitSchema);
