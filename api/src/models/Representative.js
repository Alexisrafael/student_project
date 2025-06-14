const { DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Representative = sequelize.define('representative', {
    id : {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull : false,
      primaryKey : true,
    },
    identificate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING
    },
    address : {
      type: DataTypes.STRING
    },
    profession : {
      type: DataTypes.STRING
    },
    rol:{
      type : DataTypes.INTEGER
    }
  },{
    timestamps: false 
  });

  Representative.ROL = {
    ADMIN: 0,
    USER: 1,
  };

  return Representative;
};
