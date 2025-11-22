import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Produto = sequelize.define(
  "Produto",
  {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "codigo_ean",
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    setor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grupo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_fornecedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_fornecedor",
    },
    quantidade: { type: DataTypes.INTEGER, field: "quantidade_estoque" },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "produtos", // Nome da tabela no banco
  },
);

export default Produto;
