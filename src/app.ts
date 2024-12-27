import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import holderSnapshotRoutes from './routes/holdersnapshots.routes';
import graphRoutes from './routes/graph.routes';
import tokenRoutes from './routes/token.routes';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use holder snapshot routes
app.use('/holdersnapshots', holderSnapshotRoutes);

// Use graph routes
app.use('/graph', graphRoutes);

// Use token routes
app.use('/token', tokenRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
