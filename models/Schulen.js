import mongoose from "mongoose";
const SchulenSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schulen", SchulenSchema);
