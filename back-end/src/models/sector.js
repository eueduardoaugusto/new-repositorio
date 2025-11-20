import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Setor = sequelize.define(
  "Sector",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "Setor" }
);

export default Setor;
