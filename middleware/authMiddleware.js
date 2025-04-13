const jwt = require("jsonwebtoken");
const User = require("../models/User");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    User.findByPk(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Attach the full user object to the request
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
      });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authenticateToken;