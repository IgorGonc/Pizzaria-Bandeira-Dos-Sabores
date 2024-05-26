const { Cliente } = require('../models');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Log para verificar os dados recebidos
        console.log("Email recebido:", email);
        console.log("Senha recebida:", senha);

        // Busque o usuário pelo email no banco de dados
        const cliente = await Cliente.findOne({ where: { Email: email } });

        if (!cliente) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Log para verificar a senha armazenada no banco de dados
        console.log("Senha armazenada no banco de dados:", cliente.Senha);

        // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
        const senhaCorreta = await bcrypt.compare(senha, cliente.Senha);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Se as credenciais estiverem corretas, você pode retornar uma resposta indicando sucesso no login
        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
