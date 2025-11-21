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
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_cliente",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
    },
    total_value: { type: DataTypes.DECIMAL(10, 2), field: "valor_total" },
    payment_type: {
      type: DataTypes.ENUM("Dinheiro", "Cartao", "Pix", "Outros"),
      field: "tipo_pagamento",
    },
  },
  {
    tableName: "vendas",
    timestamps: false,
  },
);

export default Sale;
