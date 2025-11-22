import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Supplier = sequelize.define(
  "Supplier",
  {
    id_supplier: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_fornecedor",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nome",
    },
    cnpj: {
      type: DataTypes.STRING(18),
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      field: "telefone",
    },
    email: {
      type: DataTypes.STRING(100),
      validate: { isEmail: true },
    },
    address: {
      type: DataTypes.STRING(200),
      field: "endereco",
    },
  },
  {
    tableName: "fornecedores",
    timestamps: false,
  },
);

export default Supplier;
