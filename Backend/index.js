import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath, pathToFileURL } from "url";
import cors from "cors";
import CreateTask from "./Controllers/createTask.controller.js";
import GetTasks from "./Controllers/getTasks.controller.js";
import editTask from "./Controllers/editTask.controller.js";
import deleteTask from "./Controllers/deleteTask.controller.js";
const app = express();
app.use(express.json());
app.use(helmet());

app.use(cors({ origin: "http://localhost:5173" }));
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("SucessFully connected to mongo db"))
  .catch((err) => console.log(`error in connecting mongodb ${err}`));

app.get("/", (req, res) => {
  res.status(200).json({ message: "listened at home url" });
});

app.post("/createTask", CreateTask);
app.get("/getTask", GetTasks);
app.patch("/updateTask/:id", editTask);
app.delete("/deletetask/:id", deleteTask);

app.listen("3000", () => {
  console.log(`Server listening at 3000`);
});
