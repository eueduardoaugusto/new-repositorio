import Grupos from "../models/groups.js";

export const listarGrupos = async (req, res) => {
  try {
    const grupos = await Grupos.findAll();
    res.status(200).json(grupos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar grupos" });
  }
};
export const listarGruposPorSetor = async (req, res) => {
  try {
    const { id } = req.params;

    const grupos = await Grupos.findAll({
      where: { setor: id },
    });

    res.status(200).json({ grupos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar grupos por setor" });
  }
};

export const buscarGrupos = async (req, res) => {
  try {
    const grupos = await Grupos.findByPk(req.params.id);
    if (!grupos) {
      return res.status(404).json({ mensagem: "Grupos não encontrado" });
    }
    res.status(200).json(grupos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar grupos" });
  }
};

export const criarGrupos = async (req, res) => {
  try {
    const novoGrupos = await Grupos.create(req.body);
    res.status(201).json(novoGrupos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar grupos" });
  }
};

export const atualizarGrupos = async (req, res) => {
  try {
    const grupos = await Grupos.findByPk(req.params.id);
    if (!grupos) {
      return res.status(404).json({ mensagem: "Grupos não encontrado" });
    }
    await grupos.update(req.body);
    res.status(200).json({ mensagem: "Grupos atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar grupos" });
  }
};

export const deletarGrupos = async (req, res) => {
  try {
    const grupos = await Grupos.findByPk(req.params.id);
    if (!grupos) {
      return res.status(404).json({ mensagem: "Grupos não encontrado" });
    }
    await grupos.destroy();
    res.status(200).json({ mensagem: "Grupos removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar grupos" });
  }
};
