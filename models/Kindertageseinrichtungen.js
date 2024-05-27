import mongoose from "mongoose";

const KindertageseinrichtungenSchema = new mongoose.Schema(
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
      BEZEICHNUNG: String,
      KURZBEZEICHNUNG: String,
      STRASSE: String,
      STRSCHL: String,
      HAUSBEZ: String,
      PLZ: String,
      ORT: String,
      HORT: {
        type: Number,
      },
      KITA: {
        type: Number,
      },
      URL: String,
      TELEFON: String,
      FAX: String,
      EMAIL: String,
      BARRIEREFREI: {
        type: Number,
        default: 0,
      },
      INTEGRATIV: {
        type: Number,
        default: 0,
      },
    },
    geometry: {
      x: "Number",
      y: "Number",
    },
    type: {
      type: "String",
      default: "Feature",
    },
    id: "number",
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Kindertageseinrichtungen",
  KindertageseinrichtungenSchema
);
