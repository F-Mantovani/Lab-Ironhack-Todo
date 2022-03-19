const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ Error: "Request without token" });
  const tokenMinusBear = token.split(" ")[1];
  try {
    const decodedToken = jwt.verify(tokenMinusBear, process.env.SECRET_JWT);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};

module.exports = authorization;
