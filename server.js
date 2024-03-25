import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js';
import cors from  'cors'
import Property from './models/propertyModel.js';
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/property", propertyRoutes);

app.get("/", (req, res) => {
    res.send('<h1>hello</h1>');
});

app.listen(2929, () => {
    console.log('Server Running on mode on port 2929');
});
