const { Router } = require('express');
const { Register, Login, requestPasswordReset, resetPassword } = require('../authLogin/authRoute');
//const authJwt = require('../middlewares/authJwt');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post('/forgot_password', requestPasswordReset);
router.post('/reset_password/:token', resetPassword);

module.exports = router;
