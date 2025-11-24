CREATE DATABASE IF NOT EXISTS cantinho_pet;
USE cantinho_pet;

CREATE TABLE users (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cargo ENUM('proprietario', 'funcionario', 'admin') DEFAULT 'funcionario',
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20),
  email VARCHAR(100),
  cep VARCHAR(10),
  logadouro VARCHAR(20),
  endereco VARCHAR(200),
  numero VARCHAR(10),
  complemento VARCHAR(20),
  cidade VARCHAR(60),
  estado CHAR(2),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pets (
  id_pet INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT,
  nome_pet VARCHAR(50) NOT NULL,
  especie ENUM('Cachorro', 'Gato') NOT NULL,
  raca VARCHAR(50),
  idade INT,
  observacao TEXT,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE fornecedores (
  id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cnpj VARCHAR(18) UNIQUE,
  telefone VARCHAR(20),
  email VARCHAR(100),
  endereco VARCHAR(200)
);

CREATE TABLE produtos (
  id_produto INT AUTO_INCREMENT PRIMARY KEY,
  codigo_ean CHAR(13) UNIQUE,
  nome VARCHAR(100) NOT NULL,
  tamanho VARCHAR(20),
  setor ENUM('Caes','Gatos'),
  grupo ENUM('Servico','Brinquedo', 'Racao', 'Petisco', 'Acessorio', 'Higiene', 'Farmacia', 'Outros') NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  quantidade_estoque INT DEFAULT 0,
  id_fornecedor INT,
  FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id_fornecedor)
);

CREATE TABLE agendamentos (
  id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_pet INT NOT NULL,
  id_servico INT NOT NULL,
  data_horario DATETIME NOT NULL,
  status ENUM('Pendente', 'Confirmado', 'Concluido', 'Cancelado') DEFAULT 'Pendente',
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (id_pet) REFERENCES pets(id_pet),
  FOREIGN KEY (id_servico) REFERENCES produtos(id_produto)
);

CREATE TABLE vendas (
  id_venda INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT,
  data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(10,2),
  tipo_pagamento ENUM('Dinheiro', 'Cartao', 'Pix', 'Outros'),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE itens_venda (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  id_venda INT,
  id_produto INT,
  quantidade INT DEFAULT 1,
  preco_unitario DECIMAL(10,2),
  FOREIGN KEY (id_venda) REFERENCES vendas(id_venda),
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);
