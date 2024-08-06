import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/admin.db";
import router from "./routes/admin.route";

dotenv.config();
const port = process.env.PORT;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
