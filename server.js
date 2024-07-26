import express from "express";
import cors from "cors";
import path from "path";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import { getDirname } from "./helpers/dirName.js";

const __dirname = getDirname(import.meta.url);

dotenv.config();

const app = express();
connectToMongo();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from frontend/build
app.use(express.static(path.join(__dirname, "frontend", "build")));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoute);

// Serve the React frontend for all other routes
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`.bgCyan.white);
});
