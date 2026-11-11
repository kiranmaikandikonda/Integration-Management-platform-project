import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import translationRoutes from "./routes/translationRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import travelRoutes from "./routes/travelRoutes.js";
import voiceRoutes from "./routes/voiceRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/maps", mapRoutes);
app.use("/api/translation", translationRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/weather", weatherRoutes);

app.use(errorMiddleware);

await connectDB();

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});