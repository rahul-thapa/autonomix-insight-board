import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import transcriptRoutes from "./routes/transcript";
import { connectDB } from "./db/connection";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Db connection
connectDB();

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.use("/", transcriptRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
