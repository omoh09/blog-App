const Sequelize = require('sequelize');

const sequelize = new Sequelize('blog', 'admin', 'password', {
  dialect: 'mysql',
  host: 'localhost' 
});

module.exports = sequelize;
