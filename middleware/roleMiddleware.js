// middleware/roleMiddleware.js

function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    // Get the user's role from the decoded JWT token (attached by authenticateToken)
    const userRole = req.user.role;

    // Check if the user's role is included in the allowed roles
    if (allowedRoles.includes(userRole)) {
      next(); // User has the required role, proceed to the next middleware/route
    } else {
      res.status(403).json({ message: "Access denied. You do not have the required role." });
    }
  };
}

module.exports = roleMiddleware;