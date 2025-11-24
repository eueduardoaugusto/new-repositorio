import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Lancamento = sequelize.define(
  "Lancamento",
  {
    lancamento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_lancamento",
    },
    budget: { type: DataTypes.STRING, field: "orcamento" },
    rps: { type: DataTypes.STRING, field: "rps" },
    nfse: { type: DataTypes.STRING, field: "nfs" },
    clientName: { type: DataTypes.STRING, field: "nome_cliente" },
    value: { type: DataTypes.DECIMAL(10, 2), field: "valor" },
    type: { type: DataTypes.STRING, field: "tipo" },
    installments: { type: DataTypes.INTEGER, field: "parcelas" },
    emissionDate: { type: DataTypes.DATEONLY, field: "data_emissao" },
  },
  { tableName: "lancamentos", timestamps: false },
);

export default Lancamento;
