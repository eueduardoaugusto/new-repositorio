import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Pet = sequelize.define(
  "Pet",
  {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_pet",
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_cliente",
    },
    pet_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "nome_pet",
    },
    pet_specie: {
      type: DataTypes.ENUM("Cachorro", "Gato"),
      allowNull: false,
      field: "especie",
    },
    pet_race: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: "raca",
    },
    pet_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "idade",
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "observacao",
    },
  },
  {
    timestamps: false,
    tableName: "pets",
  },
);

export default Pet;
