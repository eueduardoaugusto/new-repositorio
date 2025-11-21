import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id_usuario",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nome",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "senha",
    },
    role: {
      type: DataTypes.ENUM("proprietario", "funcionario", "admin"),
      defaultValue: "funcionario",
      field: "cargo",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "data_criacao",
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

export default User;
