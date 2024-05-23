const express = require('express')
const bodyParser = require('body-parser')
const clienteRoutes = require('./routes/clienteRoutes')
const sequelize = require('./db') // Certifique-se de que este caminho está correto

const app = express()

app.use(bodyParser.json())
app.use('/clientes', clienteRoutes)

const PORT = process.env.PORT || 3000
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`)
  })
})
