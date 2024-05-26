const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promocao = sequelize.define('Promocao', {
    IdPromocao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Desconto: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Promocao;
