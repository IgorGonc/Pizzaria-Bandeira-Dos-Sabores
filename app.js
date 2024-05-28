const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const clienteRoutes = require('./routes/clienteRoutes')
const produtoRoutes = require('./routes/produtoRoutes')
const carrinhoRoutes = require('./routes/carrinhoRoutes')
const pedidoRoutes = require('./routes/pedidoRoutes')

const Cliente = require('./models/Cliente')
const Produto = require('./models/Produto')
const Carrinho_Compra = require('./models/carrinho_compra')
const Itens = require('./models/Itens')
const Pedido = require('./models/pedido') // Certifique-se de importar o modelo de Pedido

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('API da Pizzaria Bandeira dos Sabores')
})

app.use('/api/clientes', clienteRoutes)
app.use('/api/produtos', produtoRoutes)
app.use('/api/carrinho', carrinhoRoutes)
app.use('/api/pedido', pedidoRoutes)

// Sincronizar os modelos na ordem correta
sequelize
  .sync({ force: false }) // Use force: true apenas se quiser recriar as tabelas, force: false evita isso.
  .then(() => {
    console.log('Banco de dados sincronizado')
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err)
  })
