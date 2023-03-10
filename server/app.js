import express from "express";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
export default app;

dotenv.config({
  path: "./config/config.env",
});

//routers

import adminRoutes from "./routes/admin.js";

app.use("/v1/api", adminRoutes);
