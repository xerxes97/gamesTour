const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release:{
      type: DataTypes.DATEONLY, 
    },
    rating:{
      type: DataTypes.DECIMAL,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    createdAt: false,
    updatedAt:false
  });
};
