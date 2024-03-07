const tokenFunctions = require('../utils/tokenFunctions');

module.exports = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ message: 'Token not found' });
  const token = bearerToken.split(' ')[1];

  try {
    const payload = tokenFunctions.verifyToken(token);
    req.locals = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};