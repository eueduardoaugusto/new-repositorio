import Setor from "../models/sector.js";

export const listarSetor = async (req, res) => {
  try {
    const setor = await Setor.findAll();
    res.status(200).json(setor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar setor" });
  }
};

export const buscarSetor = async (req, res) => {
  try {
    const setor = await Setor.findByPk(req.params.id);
    if (!setor) {
      return res.status(404).json({ mensagem: "Setor não encontrado" });
    }
    res.status(200).json(setor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar setor" });
  }
};

export const criarSetor = async (req, res) => {
  try {
    const novoSetor = await Setor.create(req.body);
    res.status(201).json(novoSetor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar setor" });
  }
};

export const atualizarSetor = async (req, res) => {
  try {
    const setor = await Setor.findByPk(req.params.id);
    if (!setor) {
      return res.status(404).json({ mensagem: "Setor não encontrado" });
    }
    await setor.update(req.body);
    res.status(200).json({ mensagem: "Setor atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar setor" });
  }
};

export const deletarSetor = async (req, res) => {
  try {
    const setor = await Setor.findByPk(req.params.id);
    if (!setor) {
      return res.status(404).json({ mensagem: "Setor não encontrado" });
    }
    await setor.destroy();
    res.status(200).json({ mensagem: "Setor removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar setor" });
  }
};
