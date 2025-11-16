import Produto from "../models/products.js";

// Listar todos os produtos cadastrados
export const listarProduto = async (req, res) => {
  try {
    const produto = await Produto.findAll();
    res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
};

// Buscar produto por ID
export const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
};
// Criar produto
export const criarProduto = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
};

// Atualizar produto
export const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    await produto.update(req.body);
    res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};

// Deletar produto
export const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    await produto.destroy();
    res.status(200).json({ mensagem: "Produto removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};