const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User, Representative } = require("../db");

async function Register(req, res){
  try {
    const { name, lastName, email, password, identificate, emailUser, phone, address, profession, age } = req.body;
    
    if (!name || !lastName || !email || !password || !identificate || !emailUser || !phone || !address || !age) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    
    const normalizedEmail = email.toLowerCase();
    const normalizedEmailUser = emailUser.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD 
      }
    });

    const seachUser = await User.findOne({ where: { email: normalizedEmail, type_user: User.TYPE_USER.USER } });
    if (seachUser) {
      return res.status(400).json({ error: `El correo de usuario: ${normalizedEmail} ya está registrado` });
    }

    const [representative, createdRepresentative] = await Representative.findOrCreate({
      where: { email: normalizedEmail },  // Busca un usuario con el mismo email
      defaults: { name, lastName, email: normalizedEmail, rol: Representative.ROL.USER, identificate, phone, address, profession }, // Si no existe, lo crea con estos valores
    });
    
    if (createdRepresentative) {
      
      const [user, createdUser] = await User.findOrCreate({
        where: { email: normalizedEmail },  // Busca un usuario con el mismo email
        defaults: { name, lastName, email: normalizedEmail, password: hashedPassword, type_user: User.TYPE_USER.ADMIN, representativeId: representative.id, phone, age , sesionCount: 0, active: true}, // Si no existe, lo crea con estos valores
      });

      if (!createdUser) {
        return res.status(400).json({ error: `El correo de usuario: ${normalizedEmail} ya está registrado` });
      }else{
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: normalizedEmail,
          subject: "Te registraste en nuestra plataforma",
          html: `<p>Hola ${user.name + " " + user.lastName}  ya haces parte de nueestra plataforma</p>`
        });
        return res.status(201).json({user, representative, message: "Usuario registrado con éxito" });
      }
    }else{
      const [user, createdUser] = await User.findOrCreate({
        where: { email: normalizedEmailUser },  // Busca un usuario con el mismo email
        defaults: { name, lastName, email: normalizedEmailUser, password: hashedPassword, type_user: User.TYPE_USER.USER, representativeId: representative.id, age, sesionCount: 0, active: true }, // Si no existe, lo crea con estos valores
      });

      if (!createdUser) {
        return res.status(400).json({ error: `El correo de usuario: ${normalizedEmailUser} ya está registrado` });
      }else{
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: normalizedEmailUser,
          subject: "Restablecer contraseña",
          html: `<p>Hola ${user.name + " " + user.lastName} ya haces parte de nueestra plataforma</p>`
        });
        return res.status(201).json({user, representative, message: "Usuario registrado con éxito" });
      }
    }
  
  
  } catch (error) {
    console.error("Error en Register:", error);
    return res.status(500).json({ error: "Error verifica los campos para poder registrarte " + error.message });
  }

};

async function Login(req, res) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail}, include: Representative });

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    console.log(":", email, user.email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    await user.increment('sesionCount', { by: 1 });

    const token = jwt.sign({ id: user.id, email: user.email, type_user: user.type_user, name:  `${user.name} ${user.lastName}`, representativeId: user.representativeId, address: user.address, phone: user.phone, profession: user.profession}, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // 👉 Guardar el token en una cookie segura
    res.cookie("accessToken", token, {
      httpOnly: true,             // evita que el token sea accesible por JS
      secure: false,              // pon esto en true en producción (HTTPS)
      sameSite: "Strict",         // protege contra CSRF
      maxAge: 3 * 60 * 60 * 1000  // 3 horas en milisegundos
    });

    //console.log(res.status(200).json({ message: "Inicio de sesión exitoso", token, user: `${user.name} ${user.lastName}` }));
    return res.json({ message: "Inicio de sesión exitoso", token, user: { id: user.id, email: user.email, type_user: user.type_user, name: `${user.name} ${user.lastName}`, representativeId: user.representativeId, phone: user.phone, profession: user.representative.profession, address: user.representative.address, age: user.age } });
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

async function requestPasswordReset(req, res) {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Correo requerido" });

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ where: { email: normalizedEmail } });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const now = new Date();
  const tokenData =  await PasswordResetToken.create({
    userId: user.id,
    token,
    expiresAt: new Date(now.getTime() + 15 * 60 * 1000),
    type_token: PasswordResetToken.TYPE_TOKEN.RESET_PASSWORD
  });

  // Aquí usas  o cualquier servicio de email real
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD 
    }
  });

  const resetLink = `${process.env.BACKEND_URL}/reset_password/${token}?email=${normalizedEmail}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: normalizedEmail,
    subject: "Restablecer contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p> <a href="${resetLink}">${resetLink}</a>`
  });

  res.json({ message: "Correo de restablecimiento enviado" });
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token y nueva contraseña requeridos" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (err) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
}

async function Logout(req, res) {
  try {
    // Elimina la cookie llamada "accessToken"
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false, // en producción true (si usas HTTPS)
      sameSite: "Strict",
    });

    return res.json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al cerrar sesión" });
  }
}

module.exports = {Register, Login, requestPasswordReset, resetPassword, Logout};