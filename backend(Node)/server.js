import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("api....");
});

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
/*app.use("/api/upload", uploadRoutes);*/

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`server at ${PORT}`));

process.on("unHandledRejection", (err, promise) => {
  console.log(`Logged error:${err}`);
  server.close(() => process.exit(1));
});

/*const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname)));*/
