import { sequelize } from "../config/database.js";
import { encryptPassword } from "./passwordEncryption.js";
import {
  clients,
  suppliers,
  pets,
  products,
  users,
} from "../lib/placeholder-data.js";
import { Client, Pet, Product, Supplier, User } from "../models/index.js";

async function seedClients() {
  try {
    const insertedClients = await Promise.all(
      clients.map(async (client) => await Client.create(client)),
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      clients: insertedClients,
    };
  } catch (error) {
    console.error("Error seeding clients:", error);
    throw error;
  }
}

async function seedPets(data) {
  try {
    const insertedPets = await Promise.all(
      pets.map(
        async (pet, i) =>
          await Pet.create({
            ...pet,
            client_id: data[i].id_cliente,
          }),
      ),
    );

    console.log(`Seeded ${insertedPets.length} pets`);

    return {
      pets: insertedPets,
    };
  } catch (error) {
    console.error("Error seeding pets:", error);
    throw error;
  }
}

async function seedProducts(data) {
  try {
    const insertedProducts = await Promise.all(
      products.map(
        async (product, i) =>
          await Product.create({
            ...product,
            id_fornecedor: data[i].id_supplier,
          }),
      ),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedSupplier() {
  try {
    const insertedSupplier = await Promise.all(
      suppliers.map(async (supplier) => await Supplier.create(supplier)),
    );

    console.log(`Seeded ${insertedSupplier.length} suppliers`);

    return {
      suppliers: insertedSupplier,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (data) => ({
        ...data,
        password: await encryptPassword(data.password),
      })),
    );

    const insertedUsers = await Promise.all(
      hashedUsers.map(async (user) => await User.create(user)),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  await seedUsers();

  const supplierResult = await seedSupplier();
  const suppliers = supplierResult.suppliers;
  await seedProducts(suppliers);

  const clientsResults = await seedClients();
  const clients = clientsResults.clients;
  await seedPets(clients);
}

main()
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err,
    );
  })
  .finally(() => sequelize.close());
