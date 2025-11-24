import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ItemSold = sequelize.define(
  "ItemSold",
  {
    itemSold_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleId: { type: DataTypes.INTEGER, field: "id_venda" },
    productId: { type: DataTypes.INTEGER, field: "id_produto" },
    quantity: { type: DataTypes.INTEGER, field: "quantidade" },
    unitPrice: { type: DataTypes.DECIMAL(10, 2), field: "preco_unitario" },
    discount: { type: DataTypes.DECIMAL(10, 2), field: "desconto" },
    finalPrice: { type: DataTypes.DECIMAL(10, 2), field: "preco_final" },
  },
  {
    tableName: "itens_venda",
    timestamps: false,
  },
);

export default ItemSold;
