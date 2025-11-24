import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Invoice = sequelize.define(
  "Invoice",
  {
    invoice_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_nota_fiscal",
    },
    rpsNumber: { type: DataTypes.STRING, field: "rps" },
    nfseNumber: { type: DataTypes.STRING, field: "nfs_e" },
    issueDate: { type: DataTypes.DATE, field: "data_emissao" },
    saleId: { type: DataTypes.INTEGER, field: "id_venda" },
  },
  {
    tableName: "notas_fiscais",
    timestamps: false,
  },
);

export default Invoice;
