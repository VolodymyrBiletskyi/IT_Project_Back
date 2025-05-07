const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Specialist = require('../models/Specialist');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(500).json({ message: "Internal server error during authentication" });
    }

    try {
      let user;
      switch (decoded.role) {
        case 'doctor':
        case 'specialist':
          user = await Specialist.findByPk(decoded.id);
          break;
        case 'receptionist':
        case 'owner':
        case 'admin':
          user = await User.findByPk(decoded.id);
          break;
        default:
          return res.status(403).json({ message: "Invalid user role" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: decoded.role,
        name: user.name
      };

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ message: "Internal server error during authentication" });
    }
  });
}

function isReceptionist(req, res, next) {
  if (req.user && req.user.role === 'receptionist') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Receptionist role required." });
  }
}

function isSpecialistOrDoctor(req, res, next) {
  if (req.user && (req.user.role === 'specialist' || req.user.role === 'doctor')) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Specialist or Doctor role required." });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
}

// Export only the authenticateToken function
module.exports = authenticateToken;