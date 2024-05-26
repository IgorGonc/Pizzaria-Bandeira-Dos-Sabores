const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'WhUzYtKLlfBnTXXmpKziBsziIOvpIsxy', {
    host: 'viaduct.proxy.rlwy.net',
    dialect: 'mysql',
    port: 13329,
    dialectOptions: {
        // Adicione mais opções se necessário
    }
});

module.exports = sequelize;
