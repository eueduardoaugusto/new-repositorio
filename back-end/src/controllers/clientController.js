import { Client as Cliente, Pet } from "../models/index.js";
import { sequelize } from "../config/database.js";

export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Pet,
          required: true,
        },
      ],
    });
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar clientes" });
  }
};

export const buscarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      include: [
        {
          model: Pet,
          required: true,
        },
      ],
    });
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
  const data = req.body;
  const t = await sequelize.transaction();

  try {
    const novoCliente = await Cliente.create(
      {
        nome: data.nome,
        cpf: data.cpf,
        cep: data.cep,
        logadouro: data.logadouro,
        endereco: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
        email: data.email,
        telefone: data.telefone,
      },
      { transaction: t },
    );

    if (data.pet_nome) {
      await Pet.create(
        {
          client_id: novoCliente.id_cliente,
          pet_name: req.body.pet_nome,
          pet_specie: req.body.pet_especie,
          pet_race: req.body.pet_raca,
          pet_age: req.body.pet_idade,
        },
        { transaction: t },
      );
    }

    await t.commit();

    return res.json({
      message: "Cliente cadastrado com sucesso!",
      novoCliente,
    });
  } catch (error) {
    await t.rollback();
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
