const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node-complete', 
    'root', 
    '19erkinbek98', 
    {dialect: 'mysql', host: 'localhost'}
);

module.exports = sequelize;