import Produto from "../models/products.js";
import { Op } from "sequelize";

export const filtrarProduto = async (req, res) => {
  try {
    const { nome, codigo, grupo, setor } = req.query;

    const where = {};
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    if (codigo) where.codigo = { [Op.like]: `%${codigo}%` };
    if (grupo) where.grupo = { [Op.like]: `%${grupo}%` };
    if (setor) where.setor = { [Op.like]: `%${setor}%` };

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
