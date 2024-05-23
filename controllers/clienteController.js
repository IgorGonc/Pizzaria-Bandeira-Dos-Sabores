const { Cliente } = require('../models')

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, endereco, tel } = req.body
    const novoCliente = await Cliente.create({
      nome,
      email,
      senha,
      endereco,
      tel,
    })
    res.status(201).json(novoCliente)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const logarNoSistema = async (req, res) => {
  try {
    const { email, senha } = req.body
    const cliente = await Cliente.findOne({ where: { email, senha } })
    if (cliente) {
      res.status(200).json(cliente)
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const gerenciarConta = async (req, res) => {
  try {
    const { idCliente } = req.params
    const atualizacoes = req.body
    await Cliente.update(atualizacoes, { where: { idCliente } })
    const clienteAtualizado = await Cliente.findByPk(idCliente)
    res.status(200).json(clienteAtualizado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  cadastrarUsuario,
  logarNoSistema,
  gerenciarConta,
}
