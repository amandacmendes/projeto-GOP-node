const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gop-1', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: true,
    define: { timestamps: false }
});

module.exports = sequelize;