import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.listen(4000, () => {
  console.log(`server running on Port ${process.env.PORT}`);
});
