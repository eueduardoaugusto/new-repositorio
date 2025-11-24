import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PaymentParcel = sequelize.define(
  "PaymentParcel",
  {
    paymentParcel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    method: { type: DataTypes.STRING, field: "forma_pagamento" },
    parcelNumber: { type: DataTypes.INTEGER, field: "numero_parcela" },
    parcelValue: { type: DataTypes.DECIMAL(10, 2), field: "valor_parcela" },
    dueDate: { type: DataTypes.DATE, field: "data_vencimento" },
    saleId: { type: DataTypes.INTEGER, field: "id_venda" },
  },
  {
    tableName: "parcelas_pagamento",
    timestamps: false,
  },
);

export default PaymentParcel;
