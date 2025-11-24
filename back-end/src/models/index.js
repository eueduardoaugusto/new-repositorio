import Client from "./client.js";
import User from "./user.js";
import Supplier from "./supplier.js";
import Product from "./products.js";
import Sale from "./sale.js";
import ItemSold from "./saleItem.js";
import Budget from "./budget.js";
import Invoice from "./invoces.js";
import PaymentParcel from "./paymentParcel.js";
import Pet from "./pets.js";
import Setor from "./setor.js";
import Grupos from "./groups.js";

Client.hasMany(Pet, { foreignKey: "id_cliente" });
Pet.belongsTo(Client, { foreignKey: "id_cliente" });

Client.hasMany(Sale, { foreignKey: "id_cliente" });
Sale.belongsTo(Client, { foreignKey: "id_cliente" });

User.hasMany(Sale, { foreignKey: "id_usuario" });
Sale.belongsTo(User, { foreignKey: "id_usuario" });

Supplier.hasMany(Product, { foreignKey: "id_fornecedor" });
Product.belongsTo(Supplier, { foreignKey: "id_fornecedor" });

Product.hasMany(ItemSold, { foreignKey: "id_produto" });
ItemSold.belongsTo(Product, { foreignKey: "id_produto" });

Sale.hasMany(ItemSold, { foreignKey: "id_venda" });
ItemSold.belongsTo(Sale, { foreignKey: "id_venda" });

Budget.hasOne(Sale, { foreignKey: "id_orcamento" });
Sale.belongsTo(Budget, { foreignKey: "id_orcamento" });

Sale.hasOne(Invoice, { foreignKey: "id_venda" });
Invoice.belongsTo(Sale, { foreignKey: "id_venda" });

Sale.hasMany(PaymentParcel, { foreignKey: "id_venda" });
PaymentParcel.belongsTo(Sale, { foreignKey: "id_venda" });

Client.hasMany(Budget, { foreignKey: "id_cliente" });
Budget.belongsTo(Client, { foreignKey: "id_cliente" });
Budget.belongsTo(User, { foreignKey: "id_usuario" });

Invoice.belongsTo(Sale, { foreignKey: "id_venda" });
Sale.hasMany(Invoice, { foreignKey: "id_venda" });

export {
  Client,
  User,
  Supplier,
  Product,
  Sale,
  ItemSold,
  Budget,
  Invoice,
  PaymentParcel,
  Pet,
  Setor,
  Grupos,
};
