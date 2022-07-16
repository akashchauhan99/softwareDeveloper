const { Sequelize, Model, DataTypes } = require("sequelize");
const { user, host, database, password, port } = require('./config');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;