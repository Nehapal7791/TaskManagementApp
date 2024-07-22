import express from "express";
import router from "./routers/index.routes.js";
import { specs, swaggerUi } from "./config/swagger.js";

import cors from "cors";
const app = express();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "https://task-management-app-np.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());
app.use("/api", router);
// app.use(cors());
app.options("*", cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (_req, res) => {
  res.send("Hey There APIs Here......");
});

// ============ Debugging purpose only ================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// ============================================
app.all("*", (_req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
