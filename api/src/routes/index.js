const { Router } = require('express');
const { Register, Login, requestPasswordReset, resetPassword, Logout } = require('../authLogin/authRoute');
const authJwt = require('../middlewares/authJwt');
const { GetUsers } = require('../getData/getUserFilter');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post('/forgot_password', requestPasswordReset);
router.post('/reset_password/:token', resetPassword);
router.post("/logout", Logout);
router.get("/users", authJwt, GetUsers);
router.get("/me", authJwt,  async (req, res) => {
  try {
    // req.user contiene los datos decodificados del token
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
