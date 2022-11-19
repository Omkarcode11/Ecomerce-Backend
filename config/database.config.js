let Sequelize = require('sequelize');

let sequelizeCon = new Sequelize('ecomm', 'root', 'omkar', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelizeCon;
