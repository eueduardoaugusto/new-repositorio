import Produto from "../models/products.js";
import { Op } from "sequelize";

// Filtrar produto por nome, código, grupo ou setor
export const filtrarProduto = async (req, res) => {
  try {
    const { nome, codigo, grupo, setor } = req.query;

    // Cria um objeto "where" com condições dinâmicas
    const where = {};
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    if (codigo) where.codigo = { [Op.like]: `%${codigo}%` };
    if (grupo) where.grupo = { [Op.like]: `%${grupo}%` };
    if (setor) where.setor = { [Op.like]: `%${setor}%` };

    // Busca no banco de dados
    const produtos = await Produto.findAll({ where });

    if (produtos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum produto encontrado" });
    }

    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao filtrar produtos" });
  }
};
