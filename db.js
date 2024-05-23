const { Sequelize } = require('sequelize')
const config = require('./config/config.json')

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err)
  })

module.exports = sequelize
