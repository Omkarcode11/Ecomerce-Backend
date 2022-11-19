const { DataTypes } = require('sequelize');
let sequelizeCon = require('./../config/database.config');

let Product = sequelizeCon.define("product",{
 id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }
}  ,{
    timestamps : false
});

module.exports = Product