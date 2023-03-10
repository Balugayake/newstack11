import express from "express";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
import path from "path";
export default app;

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config/config.env" });
}
console.log(process.env.PORT);
//routers

import adminRoutes from "./routes/admin.js";

app.use("/v1/api", adminRoutes);

app.use(express.static(path.resolve("./firsttask/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./firsttask/build/index.html"));
});
