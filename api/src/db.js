require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize, DataTypes));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(
  ([modelName, model]) => [modelName[0].toUpperCase() + modelName.slice(1), model]
);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Representative, PasswordResetToken } = sequelize.models;

// Relaciones:
// 1. Representative puede tener muchos users.
// 2. Un user solo puede tener un Representative.
// 3. Un usuario puede tener muchos PasswordResetToken.
// 4. PasswordResetToken solo puede tener un usuario.

Representative.hasMany(User);
User.belongsTo(Representative);

User.hasMany(PasswordResetToken);
PasswordResetToken.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};