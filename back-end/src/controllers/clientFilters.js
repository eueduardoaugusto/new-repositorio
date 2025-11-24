import { Client as Cliente, Pet } from "../models/index.js";
import { Op } from "sequelize";

export const filtrarCliente = async (req, res) => {
  try {
    const { nome, telefone, cpf } = req.query;

    const where = {};
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    if (telefone) where.telefone = { [Op.like]: `%${telefone}%` };
    if (cpf) where.cpf = { [Op.like]: `%${cpf}%` };

    const clientes = await Cliente.findAll({
      where,
      include: [
        {
          model: Pet,
          required: true,
        },
      ],
    });

    if (clientes.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao filtrar clientes" });
  }
};
