import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Produto = sequelize.define(
  "Produto",
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
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
    preco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "produto", // Nome da tabela no banco
  }
);

export default Produto;