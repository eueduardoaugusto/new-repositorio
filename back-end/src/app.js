import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index.js";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuração dos cors (É isso que irá definir a conexão com o Front-End)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api", router);
