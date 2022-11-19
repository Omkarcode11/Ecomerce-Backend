const { DataTypes } = require('sequelize')
let sequelizeCon = require('./../config/database.config')

let Category = sequelizeCon.define('category',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    }
},{
    timestamps : false
})


module.exports = Category