import express from "express";
import router from "./routers/index.routes.js";
import { specs, swaggerUi } from "./config/swagger.js";

import cors from "cors";
const app = express();
const corsOptions = {
  origin: "https://task-management-app-np.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.options("*", cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (_req, res) => {
  res.send("Hey There APIs Here......");
});

// ============ Debugging purpose only ================
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://task-management-app-np.netlify.app/"
  );
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
