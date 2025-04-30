const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Specialist = require("../models/Specialist");


function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;
    const userId = decoded.id;

    let modelToUse;
    if (userRole === 'doctor') {

      modelToUse = Specialist;
    } else {
      modelToUse = User;
    }
    console.log("Model to Use:", modelToUse.name);
    modelToUse.findByPk(userId)
      .then((userOrSpecialist) => {
        if (!userOrSpecialist) {
          return res.status(404).json({ message: userRole === 'specialist' ? "Specialist not found" : "User not found" });
        }
        req.user = userOrSpecialist;

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