import express from "express";
import mongoose from "mongoose";
import updateRoute from "./routes/updateRoute.js";
import schulens from "./routes/schulen.js";
import jugendberufshilfens from "./routes/jugendberufshilfen.js";
import kindertageseinrichtungens from "./routes/kindertageseinrichtungen.js";
import schulsozialarbeits from "./routes/schulsozialarbeit.js";
import cors from "cors";
const app = express();
const PORT = 3000;

// MongoDB connection string
const mongoUri = "mongodb://localhost:27017/Chemnitz-Institution__";

// Connect to MongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.get("/", async (req, res) => {
  try {
    res.status(200).json("Chemnitz Institutions");
  } catch (err) {
    res.status(500).json(err);
  }
});

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3001", // Allow only this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent
  })
);
app.use("/update", updateRoute);
app.use("/schulens", schulens);
app.use("/jugendberufshilfens", jugendberufshilfens);
app.use("/kindertageseinrichtungens", kindertageseinrichtungens);
app.use("/schulsozialarbeits", schulsozialarbeits);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
