import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Budget = sequelize.define(
  "Budget",
  {
    budget_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_orcamento",
    },
    budgetNumber: { type: DataTypes.STRING, field: "orcamento" },
    clientName: { type: DataTypes.STRING, field: "nome_cliente" },
    totalValue: { type: DataTypes.DECIMAL(10, 2), field: "valor" },
    issueDate: { type: DataTypes.DATE, field: "data_emissao" },
    clientId: { type: DataTypes.INTEGER, field: "id_cliente" },
    userId: { type: DataTypes.INTEGER, field: "id_usuario" },
  },
  {
    tableName: "orcamentos",
    timestamps: false,
  },
);

export default Budget;
