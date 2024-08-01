import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/admin.db";
import router from "./routes/admin.route";

dotenv.config();
const port = process.env.PORT;

const app = express();
connectDB();
app.use(express.json());

app.use(express.json());

app.use("/api/v1/admin", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
