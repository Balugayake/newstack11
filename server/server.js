import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res, next) => {
  res.send("<h1>Balu gayake</h1>");
});

app.listen(4000, () => {
  console.log(`server running on Port 4000`);
});
