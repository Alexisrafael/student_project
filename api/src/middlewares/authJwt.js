require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
  // 👉 Leer el token desde la cookie
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
};