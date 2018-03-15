# Projeto Leitura do curso udacity

Este é um aplicativo web de conteúdo e comentários. Nele é permitido que os usuários postem conteúdo em categorias pré-definidas, façam comentários em suas próprias postagens e nas de outros usuários e votem nas postagens e comentários. Para poder postar e comentar é necessário que faça login no aplicativo através do 
Google ou Facebook. E só é permitido editar ou excluir os seus próprios posts e comentários.

# Instalação e Execução

### Instalando dependências do Frontend

`cd frontend`

`yarn` ou `npm install`

* Executando

`yarn start` ou `npm start`

# Api Server

Este aplicativo só funcionará com o servidor de api deste repositório. 

### Instalando dependências do Servidor de Api

`cd api-server`

`npm install`

* Executando

`node server`

Mais informações da api e como usá-la pode ser encontrado neste [README](https://github.com/enebeze/leitura-udacity/blob/master/api-server/README.md).

# Testes

Foi implementado alguns testes utilizando Jest, Enzyme, Sinon e outros.

Para execução dos testes pode ser executado o comando `yarn test`.

Para mostrar mais detalhes o seguinte comando pode ser executado `yarn test --coverage`

