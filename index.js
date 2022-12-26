import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./Routes/index.js";

import connectDb from "./Services/mongoDbService.js";

const app = express();

dotenv.config();
// Apply cors for add all requests
app.use(cors());

// Get info from client req.body
app.use(express.json());

// Connect database
connectDb();

// Middleware router
app.use("/api/auth", authRouter);

// Listen
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
