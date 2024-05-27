// models/carrinho_compra.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');  // Importação correta do modelo Cliente
const Itens = require('./itens'); // Importação do modelo Itens

const Carrinho_Compra = sequelize.define('Carrinho_Compra', {
    IDCarrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IDCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'IDCliente'
        },
        allowNull: false
    },
    Total: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    }
}, {
    tableName: 'Carrinho_Compra',
    timestamps: false
});

// Definir a associação
Carrinho_Compra.belongsTo(Cliente, { foreignKey: 'IDCliente' });
Carrinho_Compra.hasMany(Itens, { foreignKey: 'IDCarrinho' }); // Adicionando a associação

module.exports = Carrinho_Compra;
