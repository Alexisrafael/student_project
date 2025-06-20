const { DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define("PasswordResetToken", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'representatives',
        key: 'id',
      },
    },
    type_token: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    timestamps: true 
  });

  PasswordResetToken.TYPE_TOKEN = {
    RESET_PASSWORD: 0,
  };

  return PasswordResetToken;
};