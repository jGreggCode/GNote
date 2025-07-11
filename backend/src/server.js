import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Config File
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware for Req.body
app.use(cors());
app.use(express.json());
// Raquest Limiting
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// Database Connection
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
