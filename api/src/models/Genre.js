const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue:'imagen de perrito'
        }
    },{
        createdAt: false,
        updatedAt:false
      })
}