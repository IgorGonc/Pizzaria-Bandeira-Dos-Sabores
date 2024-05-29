const bcrypt = require('bcrypt')
const { Cliente } = require('../models')

// Criar um novo cliente
exports.createCliente = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { nome, email, senha, endereco, tel } = req.body

    // Verificar se a senha foi fornecida
    if (!senha) {
      throw new Error('Senha é obrigatória')
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 10)

    // Criar o cliente no banco de dados
    const cliente = await Cliente.create({
      Nome: nome,
      Email: email,
      Senha: hashedSenha,
      Endereco: endereco,
      Tel: tel,
    })

    // Responder com o cliente criado
    res.status(201).json(cliente)
  } catch (error) {
    // Em caso de erro, responder com o erro
    console.error('Erro ao criar cliente:', error)
    res.status(400).json({ error: error.message })
  }
}

// Obter informações de um cliente pelo ID
exports.getCliente = async (req, res) => {
  try {
    const clienteId = req.params.id
    const cliente = await Cliente.findByPk(clienteId)

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    res.status(200).json(cliente)
  } catch (error) {
    console.error('Erro ao obter cliente:', error)
    res.status(500).json({ error: error.message })
  }
}

// Atualizar informações de um cliente pelo ID
exports.updateCliente = async (req, res) => {
  try {
    // Extrair o ID do cliente e os novos dados do corpo da requisição
    const clienteId = req.params.id
    const { nome, email, endereco, tel } = req.body

    // Encontrar o cliente pelo ID
    const cliente = await Cliente.findByPk(clienteId)

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    // Atualizar os dados do cliente
    cliente.Nome = nome
    cliente.Email = email
    cliente.Endereco = endereco
    cliente.Tel = tel

    // Salvar as alterações no banco de dados
    await cliente.save()

    // Responder com o cliente atualizado
    res.status(200).json(cliente)
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    res.status(500).json({ error: error.message })
  }
}

// Deletar um cliente pelo ID
exports.deleteCliente = async (req, res) => {
  try {
    // Extrair o ID do cliente da requisição
    const clienteId = req.params.id

    // Encontrar o cliente pelo ID
    const cliente = await Cliente.findByPk(clienteId)

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }

    // Deletar o cliente do banco de dados
    await cliente.destroy()

    // Responder com uma mensagem de sucesso
    res.status(200).json({ message: 'Cliente deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    res.status(500).json({ error: error.message })
  }
}

// Método para fazer login
exports.loginCliente = async (req, res) => {
  try {
    const { email, senha } = req.body

    // Verificar se o e-mail existe
    const cliente = await Cliente.findOne({ where: { Email: email } })
    if (!cliente) {
      return res.status(404).json({ error: 'E-mail não encontrado' })
    }

    // Verificar se a senha está correta
    const senhaValida = await bcrypt.compare(senha, cliente.Senha)
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    // Login bem-sucedido
    res
      .status(200)
      .json({ message: 'Login bem-sucedido', clienteId: cliente.IdCliente })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
}
