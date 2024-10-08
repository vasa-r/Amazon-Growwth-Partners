import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb";
import userRouter from "./routes/userRoute";
import errorHandler from "./middleware/errorHandler";
import productRouter from "./routes/productRoute";
import addressRouter from "./routes/addressRoute";
import paymentRouter from "./routes/paymentRoute";
import orderRouter from "./routes/orderRoute";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/orders", orderRouter);

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
