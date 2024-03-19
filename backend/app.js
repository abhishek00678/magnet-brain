import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());
config({
  path: "./database/config.env",
});

// Enable CORS for specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin to access
    credentials: true, // Allow cookies to be sent and received
  })
);

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

export default app;
