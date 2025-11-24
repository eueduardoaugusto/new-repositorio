import Cliente from "../models/client.js";

export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar clientes" });
  }
};

export const buscarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar cliente" });
  }
};

export const criarCliente = async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
};

export const atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    await cliente.update(req.body);
    res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar cliente" });
  }
};

export const deletarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    await cliente.destroy();
    res.status(200).json({ mensagem: "Cliente removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar cliente" });
  }
};
