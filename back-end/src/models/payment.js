import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Payment = sequelize.define(
  "Payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_pagamento",
    },

    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_venda",
    },

    paymentType: {
      type: DataTypes.STRING,
      field: "forma_pagamento",
    },

    installments: {
      type: DataTypes.INTEGER,
      field: "parcelas",
    },

    value: {
      type: DataTypes.DECIMAL(10, 2),
      field: "valor",
    },
  },
  {
    tableName: "pagamentos",
    timestamps: false,
  },
);

export default Payment;
