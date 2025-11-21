import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ItemSold = sequelize.define(
  "ItemSold",
  {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_item",
    },
    sale_id: { type: DataTypes.INTEGER, allowNull: false, field: "id_venda" },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_produto",
    },
    amount: { type: DataTypes.INTEGER, field: "quantidade" },
    unit_price: { type: DataTypes.DECIMAL(10, 2), field: "preco_unitario" },
  },
  { tableName: "itens_venda", timestamps: false },
);

export default ItemSold;
