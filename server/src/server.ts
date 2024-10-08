import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb";
import userRouter from "./routes/userRoute";
import errorHandler from "./middleware/errorHandler";
import productRouter from "./routes/productRoute";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    messgae: "good to go",
  });
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDb();
});
