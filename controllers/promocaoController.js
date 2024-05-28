const Promocao = require('../models/Promocao')

// Função para criar uma nova promoção
exports.criarPromocao = async (req, res) => {
  try {
    const novaPromocao = await Promocao.create(req.body)
    res.status(201).json(novaPromocao)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Função para listar todas as promoções
exports.listarPromocoes = async (req, res) => {
  try {
    const promocoes = await Promocao.findAll()
    res.status(200).json(promocoes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Função para modificar uma promoção existente
exports.modificarPromocao = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Promocao.update(req.body, {
      where: { IdPromocao: id },
    })
    if (updated) {
      const promocaoAtualizada = await Promocao.findOne({
        where: { IdPromocao: id },
      })
      return res.status(200).json({ promocao: promocaoAtualizada })
    }
    throw new Error('Promoção não encontrada')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Função para excluir uma promoção
exports.excluirPromocao = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Promocao.destroy({
      where: { IdPromocao: id },
    })
    if (deleted) {
      return res.status(204).send('Promoção deletada')
    }
    throw new Error('Promoção não encontrada')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
