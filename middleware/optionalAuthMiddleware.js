const jwt = require('jsonwebtoken');

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // No token, proceed as unauthenticated user
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Invalid token, proceed as unauthenticated user
      return next();
    }

    // Valid token, attach user to request
    req.user = user;
    next();
  });
};

module.exports = optionalAuthMiddleware;