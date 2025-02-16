import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./database/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to nursingCare API");
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await connectDB();
});

export default app;
