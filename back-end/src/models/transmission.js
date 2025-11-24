import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Transmission = sequelize.define(
  "Transmission",
  {
    trasmission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_transmissao",
    },

    initialBudget: { type: DataTypes.STRING, field: "orcamento_inicial" },

    finalBudget: { type: DataTypes.STRING, field: "orcamento_final" },
  },
  {
    tableName: "transmissoes",
    timestamps: false,
  },
);

export default Transmission;
