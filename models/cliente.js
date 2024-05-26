const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    IdCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tel: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cliente;
