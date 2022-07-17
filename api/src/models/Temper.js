const {DataTypes} = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temper', {

        id:{
            type: DataTypes.UUID,
            primaryKey: true,
               },

        name:{
         type: DataTypes.STRING,
            },
        
    },
    {
     timestamps: false, 
     freezeTableName: true,
    })
}