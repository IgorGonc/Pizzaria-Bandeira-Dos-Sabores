# API de Gerenciamento de Clientes e Pedidos
Este projeto contém as APIs para gerenciamento de clientes, produtos, carrinho de compras e pedidos.

Este README file fornece uma visão geral detalhada dos endpoints disponíveis, métodos HTTP, URLs e exemplos de corpos de requisição para interagir com a API de gerenciamento de clientes e pedidos.

## Endpoints

### Criar um novo cliente
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/clientes</code>

#### Corpo da Requisição:
<code>
{
  "nome": "Nome do Cliente",
  "email": "email@exemplo.com",
  "senha": "senha123",
  "endereco": "Endereço do Cliente",
  "tel": "123456789"
}
</code>

### Obter informações do perfil do cliente
- **Método:** GET
- **URL:** <code>http://localhost:3000/api/clientes/:id</code> (Substitua <code>:id</code> pelo ID do cliente que você deseja obter)

### Atualizar informações do perfil do cliente
- **Método:** PUT
- **URL:** <code>http://localhost:3000/api/clientes/:id</code> (Substitua <code>:id</code> pelo ID do cliente que você deseja atualizar)

#### Corpo da Requisição:
<code>
{
  "nome": "Novo Nome do Cliente",
  "email": "novoemail@exemplo.com",
  "endereco": "Novo Endereço do Cliente",
  "tel": "987654321"
}
</code>

### Deletar um cliente
- **Método:** DELETE
- **URL:** <code>http://localhost:3000/api/clientes/:id</code> (Substitua <code>:id</code> pelo ID do cliente que você deseja deletar)

### Login de usuário
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/clientes/login</code>

#### Corpo da Requisição:
<code>
{
  "email": "email@exemplo.com",
  "senha": "senha123"
}
</code>

### Adicionar Produtos
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/produtos/adicionar</code>

#### Corpo da Requisição:
<code>
{
  "nome": "Pizza Margherita",
  "descricao": "Pizza com tomate, queijo e manjericão",
  "imagem": "url_imagem",
  "valor": 25.00
}
</code>

### Adicionar Itens ao Carrinho
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/carrinho/adicionar</code>

#### Corpo da Requisição:
<code>
{
  "IDCliente": 6,
  "itens": [
    {
      "IDProduto": 7,
      "Quantidade": 2
    },
    {
      "IDProduto": 3,
      "Quantidade": 3
    }
  ]
}
</code>

### Remover do Carrinho
- **Método:** DELETE
- **URL:** <code>http://localhost:3000/api/carrinho/remover</code>

#### Corpo da Requisição:
<code>
{
  "IDCarrinho": 1,
  "IDProduto": 1
}
</code>

### Finalizar Compra
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/pedido/finalizar</code>

#### Corpo da Requisição:
<code>
{
  "IDCliente": 1,
  "IDCarrinho": 1,
  "MetodoPagamento": "Cartão de Crédito",
  "EnderecoEntrega": "Rua Exemplo, 123, Cidade, Estado"
}
</code>

### Visualizar Pedidos
- **Método:** GET
- **URL:** <code>http://localhost:3000/api/pedido/visualizar/:id</code> (Substitua <code>:id</code> pelo ID do cliente cujos pedidos você deseja visualizar)

### Atualizar Status do Pedido
- **Método:** POST
- **URL:** <code>http://localhost:3000/api/pedido/atualizar-status</code>

#### Corpo da Requisição:
<code>
{
  "IDPedido": 1,
  "Status": "Em Transporte"
}
</code>



