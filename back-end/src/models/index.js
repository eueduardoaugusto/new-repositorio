import Client from "./client.js";
import ItemSold from "./itemSold.js";
import Sale from "./sale.js";
import Supplier from "./supplier.js";
import Product from "./products.js";
import User from "./user.js";
import Pet from "./pets.js";
import Grupos from "./groups.js";
import Setor from "./setor.js";

ItemSold.belongsTo(Product, { foreignKey: "id_produto" });
Product.hasMany(ItemSold, { foreignKey: "id_produto" });

ItemSold.belongsTo(Sale, { foreignKey: "sale_id" });
Sale.hasMany(ItemSold, { foreignKey: "sale_id" });

Product.belongsTo(Supplier, { foreignKey: "id_fornecedor" });
Supplier.hasMany(Product, { foreignKey: "id_fornecedor" });

Sale.belongsTo(Client, { foreignKey: "id_cliente" });
Client.hasMany(Sale, { foreignKey: "id_cliente" });

Sale.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Sale, { foreignKey: "user_id" });

Client.hasMany(Pet, { foreignKey: "client_id" });
Pet.belongsTo(Client, { foreignKey: "client_id" });

Product.belongsTo(Supplier, { foreignKey: "id_fornecedor" });
Supplier.hasMany(Product, { foreignKey: "id_fornecedor" });

export { Client, Grupos, ItemSold, Sale, Setor, Supplier, Pet, Product, User };
