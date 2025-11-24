import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Grupos = sequelize.define(
  "Grupos",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    setor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "Grupos" },
);

export default Grupos;
