require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const Pet = require("./models/Pet");// Import the User model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();  // Use the User model
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start Server & Connect to DB
const startServer = async () => {
  try {
    await sequelize.authenticate();  // Test the database connection
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ force: false });  // Drops and recreates tables  // Sync all models
    console.log("All models were synchronized successfully.");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startServer();