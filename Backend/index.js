import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import cors from "cors";
import CreateTask from "./Controllers/createTask.controller.js";
import GetTasks from "./Controllers/getTasks.controller.js";
import SearchTasks from "./Controllers/searchTasks.controller.js";
import editTask from "./Controllers/editTask.controller.js";
import deleteTask from "./Controllers/deleteTask.controller.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "TaskList API is running" });
});

app.post("/createTask", CreateTask);
app.get("/getTask", GetTasks);
app.get("/searchTask", SearchTasks);
app.patch("/updateTask/:id", editTask);
app.delete("/deletetask/:id", deleteTask);

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
  }

  try {
const uri = process.env.MONGODB_URI;

console.log("Mongo URI exists:", Boolean(uri));
console.log("Mongo URI length:", uri?.length);
console.log("Mongo URI prefix:", JSON.stringify(uri?.slice(0, 20)));
console.log("Mongo URI starts correctly:", uri?.startsWith("mongodb+srv://"));

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
