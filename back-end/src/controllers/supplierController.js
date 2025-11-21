import { Supplier, Product } from "../models/index.js";

export async function registerSupplier(req, res) {
  const supplierData = req.body;

  try {
    const supplierExists = await Supplier.findOne({
      where: { email: supplierData.email },
    });

    if (supplierExists) {
      return res
        .status(409)
        .json({ errors: ["O fornecedor já está cadastrado."] });
    }

    const newSupplier = await Supplier.create({
      ...supplierData,
    });

    const supplierDataResponse = newSupplier.get({ plain: true });

    return res.status(201).json({
      message: "fornecedor cadastrado com sucesso",
      supplier: supplierDataResponse,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getAllSuppliers(req, res) {
  try {
    const suppliers = await Supplier.findAll({
      include: {
        model: Product,
        required: true,
      },
    });

    return res.status(200).json({ suppliers });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getSupplier(req, res) {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findByPk(id, {
      include: {
        model: Product,
        required: true,
      },
    });

    return res.status(200).json({ supplier });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function deleteSupplier(req, res) {
  const { id } = req.params;

  try {
    await Supplier.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: "Funcionário deletado com sucesso" });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}
