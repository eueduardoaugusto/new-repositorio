import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Monitor = sequelize.define(
  "Monitor",
  {
    monitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_monitor",
    },

    initialBudget: { type: DataTypes.STRING, field: "orcamento_inicial" },

    finalBudget: { type: DataTypes.STRING, field: "orcamento_final" },
  },
  {
    tableName: "monitoramento",
    timestamps: false,
  },
);

export default Monitor;
