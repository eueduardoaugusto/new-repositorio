import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Sale = sequelize.define(
  "Sale",
  {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_venda",
    },
    budgetId: {
      type: DataTypes.INTEGER,
      field: "id_orcamento",
    },
    clientId: { type: DataTypes.INTEGER, field: "id_cliente" },
    userId: { type: DataTypes.INTEGER, field: "id_usuario" },
    totalValue: { type: DataTypes.DECIMAL(10, 2), field: "valor" },
    issueDate: { type: DataTypes.DATE, field: "data_emissao" },
    type: { type: DataTypes.STRING, field: "tipo" },
    installments: { type: DataTypes.INTEGER, field: "qt_parcelas" },
  },
  {
    tableName: "vendas",
    timestamps: true,
  },
);

export default Sale;
