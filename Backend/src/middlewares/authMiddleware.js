const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accès refusé. Aucun token fourni." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification failed.", error.message);
    return res
      .status(403)
      .json({
        message: "Token invalide ou expiré. Veuillez vous reconnecter.",
      });
  }
};

module.exports = authMiddleware;
