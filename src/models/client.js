import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Cliente = sequelize.define(
  "Cliente",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logadouro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pet_especie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pet_raca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pet_idade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "cliente", // Nome da tabela no banco
  }
);

export default Cliente;
