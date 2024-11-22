const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");

// env configuration
dotenv.config();

// Connect Database
connectDb();

// Rest Object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// PORT
const port = process.env.PORT || 8000;

// ROUTE
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});