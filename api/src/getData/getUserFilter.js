const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { Op } = require("sequelize");

async function GetUsers(req, res) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Acceso denegado. Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const representativeId = decoded.id;
    const userId = decoded.id; // ID del usuario actual

    const users = await User.findAll({
      where: {
        representativeId,
        id: { [Op.not]: userId }  // Excluir al mismo usuario
      }
    });

    const usersData = users.map(user => ({
      id: user.id,
      email: user.email,
      type_user: user.type_user,
      name: `${user.name} ${user.lastName}`,
      representativeId: user.representativeId,
      age: user.age,
      phone: user.phone,
      updatedAt: formatAMPM(user.updatedAt),
      active: user.active,
      sesionCount: user.sesionCount
    }));

    return res.json(usersData);
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

function formatAMPM(rawISOString) {
  const d = new Date(rawISOString);
  const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

  let h = d.getHours(),
      m = String(d.getMinutes()).padStart(2, '0'),
      ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;

  const diaSemana = dias[d.getDay()],
        dia = d.getDate(),
        mes = meses[d.getMonth()];

  return `${diaSemana} ${dia} de ${mes} a las ${h}:${m}${ampm}`;
}

module.exports = { GetUsers };