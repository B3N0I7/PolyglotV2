const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.polyglotToken;
  console.log(`authMiddleware token: ${token}`);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé. Aucun token fourni." });
  }
  console.log(
    `authMiddleware jwt verify token: ${token} secret 2nd time: ${process.env.JWT_SECRET}`
  );
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed.", error.message);
    return res.status(403).json({
      message: "Token invalide ou expiré. Veuillez vous reconnecter.",
    });
  }
};

module.exports = authMiddleware;
