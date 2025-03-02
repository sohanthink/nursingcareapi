import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./database/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";

import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import formRouter from "./routes/form.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/form", formRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to nursingCare API");
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await connectDB();
});

export default app;
