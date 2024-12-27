"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const holdersnapshots_routes_1 = __importDefault(require("./routes/holdersnapshots.routes"));
const graph_routes_1 = __importDefault(require("./routes/graph.routes"));
const token_routes_1 = __importDefault(require("./routes/token.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)();
// Use holder snapshot routes
app.use('/holdersnapshots', holdersnapshots_routes_1.default);
// Use graph routes
app.use('/graph', graph_routes_1.default);
// Use token routes
app.use('/token', token_routes_1.default);
// Example route
app.get("/", (req, res) => {
    res.send("API is running...");
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
