import Cliente from "../models/client.js";
import { Op } from "sequelize";

// Filtrar clientes por nome, telefone, cpf
export const filtrarCliente = async (req, res) => {
  try {
    const { nome, telefone, cpf } = req.query;

    // Cria um objeto "where" com condições dinâmicas
    const where = {};
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    if (telefone) where.telefone = { [Op.like]: `%${telefone}%` };
    if (cpf) where.cpf = { [Op.like]: `%${cpf}%` };
    
    // Busca no banco de dados
    const clientes = await Cliente.findAll({ where });

    if (clientes.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum cliente encontrado" });
    }

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao filtrar clientes" });
  }
};
