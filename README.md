

## :clipboard: Requisitos

- [x] Deve ser possivel Criar uma conta.
- [x] Deve ser possivel buscar o extrato bancário do Cliente.
- [x] Deve ser possivel Realizar um depósito.
- [x] Deve ser possivel realizar um saque.
- [x] Deve ser possivel buscar o extrato bancário do cliente por data.
- [x] Deve ser possivel atualizar dados da conta do cliente .
- [x] Deve ser possivel obter dados da conta do cliente.
- [x] Deve ser possivel deletar uma conta.
- [x] Deve ser possivel obter o saldo da conta.


## :heavy_check_mark: Regras de negócio

- [x] Não deve ser possivel cadastrar uma conta com cpf já existente.
- [x] Não deve ser possivel fazer depósito em uma conta não existente.
- [x] Não deve ser possivel buscar extrato em uma conta não existente .
- [x] Não deve ser possivel fazer um saque em uma conta não existente .
- [x] Não deve ser possivel fazer saque quando o saldo for insuficiente .
- [x] Não deve ser possivel excluir uma conta não existente .
- [x] Deve ser possivel retornar o balance .


## :rocket: Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/pt-br/)


## :warning: Pré requisitos

Antes de começar :checkered_flag:, você precisa ter o [Git](https://git-scm.com) e o [Node](https://nodejs.org/en/) instalados em sua maquina.


## :checkered_flag: Começando

```bash
  # Clone este repositório
  $ git clonehttps://github.com/Gelzieny/finapi.git

  # Entre na pasta
  $ cd finapi

  # Instale as dependências
  $ yarn

  # Para iniciar o projeto
  $ yarn start

  # Para iniciar como desenvolvedor

  $ yarn dev
  # O app vai inicializar em <http://localhost:3333>
```

## :memo: Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

Feito com :heart: por <a href="https://github.com/Gelzieny" target="_blank">Gelzieny R. Martins</a>

&#xa0;