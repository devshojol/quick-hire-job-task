import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./src/config/db.js";
import apiRouter from "./src/routes/index.js";

dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.1.21:3000",
    "https://quick-hire-gray.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.use("/api", apiRouter);

const publicDir = path.join(process.cwd(), "public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  const indexFile = path.join(publicDir, "index.html");
  try {
    return res.sendFile(indexFile);
  } catch (_) {
    return res.json({
      status: "ok",
      env: process.env.NODE_ENV || "development",
    });
  }
});

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Not found" });
  }
  const indexFile = path.join(publicDir, "index.html");
  return res.sendFile(indexFile);
});

const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 8888;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
