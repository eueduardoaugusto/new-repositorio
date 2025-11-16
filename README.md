# 🧠 Projeto Faculdade - Backend

Backend desenvolvido em **Node.js + Express + Sequelize + MySQL**.  
Responsável por lidar com autenticação, conexão ao banco e comunicação com o frontend.

---

## ⚙️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize (ORM)](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [jose](https://www.npmjs.com/package/jose) (para JWT)

---

## 📦 Estrutura do projeto

```
src/
├── config/
│ └── database.js # Conexão com o banco via Sequelize
│
├── controllers/ # Lógica das rotas
├── models/ # Modelos das tabelas
├── routes/ # Rotas da API
│ └── index.js
│
├── app.js # Configuração do Express
└── server.js # Inicialização do servidor
```

---

## 🧩 Pré-requisitos

- Node.js (v18+)
- MySQL (pode ser local via **XAMPP**, **MySQL Workbench** ou **Docker**)

---

## 🗄️ Banco de Dados

### 🧱 1. Criar o banco

No **MySQL Workbench**, execute o comando SQL abaixo:

```sql
CREATE DATABASE projeto_faculdade;
```

### 📤 2. Importar o arquivo .sql

- Abra o MySQL Workbench
- Vá em Server > Data Import
- Selecione Import from Self-Contained File
- Escolha o arquivo banco_inicial.sql (presente no repositório)
- Em Default Target Schema, selecione ou crie projeto_faculdade
- Clique em Start Import

Esse arquivo contém as tabelas iniciais necessárias, como usuarios.

---

## ⚙️ Variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base no modelo abaixo:

```
DB_NAME=projeto_faculdade
DB_USER=root
DB_PASS=
DB_HOST=localhost
PORT=3000
SESSION_SECRET=sua_chave_aqui
```

⚠️ Se você usa o XAMPP, provavelmente o usuário é root e a senha fica vazia.
⚙️ Se você usa Docker, ajuste conforme o docker-compose.yml.

---

## 🐳 Rodando com Docker (opcional)

Se preferir usar Docker, basta ter o Docker e Docker Compose instalados.

1. Suba o container MySQL:

```
docker compose up -d
```

2. O banco projeto_faculdade será criado automaticamente.
3. Configure o .env com as mesmas credenciais do docker-compose.yml.

---

## 🚀 Rodando o servidor

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor em modo desenvolvimento:

```
npm run dev
```

3. Acesse no navegador:
   http://localhost:8080/api

Se aparecer:

```
{ "message": "API funcionando!" }
```

---

## 🧑‍💻 Contribuindo

1. Faça o clone do repositório:

```
git clone https://github.com/seu-usuario/projeto-faculdade-backend.git
```

2. Crie sua branch:

```
git checkout -b feature/nome-da-feature
```

1. Faça suas alterações e commits:

```
git commit -m "Adiciona rota de login"
```

4. Envie para o GitHub:

```
git push origin feature/nome-da-feature
```

5. Crie um Pull Request.

---

## 🧾 Licença

Este projeto é apenas para fins acadêmicos (trabalho de faculdade).
Todos os direitos reservados ao grupo do projeto.
