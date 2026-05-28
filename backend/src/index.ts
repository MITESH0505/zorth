import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db";
import categoryRoutes from "./routes/categories";
import resourceRoutes from "./routes/resource";
import searchRoutes from "./routes/search";
import bookmarkRoutes from "./routes/bookmarks";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/categories", categoryRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Zorth API running on port ${PORT}`);
  });
};

start();
