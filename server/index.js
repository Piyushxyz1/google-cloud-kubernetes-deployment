import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
import connectDB from "./database/db.js";
import cors from "cors"

configDotenv()

const app = express();
app.use(cors())

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, "0.0.0.0", async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
});
