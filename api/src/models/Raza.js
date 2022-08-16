const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    years_of_life:{
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.STRING,
    },
    createdInBd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
    
  },
  {
   timestamps: false, 
   freezeTableName: true,
  });
};
