'use strict';
// import { Request } from "express";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.routes.js";

const PORT = process.env.PORT_ENV || 8080;

const app = express();
app.use(express.json());

// CORS
app.use(cors());

app.use("/", apiRouter);

const nodeEnv = process.env.NODE_ENV || "production";
app.get("/", (req,res) => {
  console.log('asked')
  res.send(`ok: ${nodeEnv}`)
})

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}\n   Build: ${nodeEnv}`);
});



