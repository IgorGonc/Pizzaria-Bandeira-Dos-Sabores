const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API da Pizzaria Bandeira dos Sabores');
});

app.use('/api', clienteRoutes);

// Sincronizar os modelos com o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
