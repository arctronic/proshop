import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload",uploadRoute);

app.get("/", (req, res) => {
  res.send("API is ruinning");
});

const __dirname = path.resolve();

app.use('/upload',express.static(path.join(__dirname,'/upload')));

app.use(notFound);

app.use(errorHandler);

app.listen(5000, console.log(`Server running on port ${PORT}`.yellow.bold));
