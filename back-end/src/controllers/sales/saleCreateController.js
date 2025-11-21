import { Op } from "sequelize";
import { sequelize } from "../../config/database.js";
import { Client, ItemSold, Product, Sale, User } from "../../models/index.js";

export async function createSale(req, res) {
  const { client_id, user_id, payment_type, items } = req.body;

  if (!client_id || !user_id || !items || !items.length) {
    return res
      .status(400)
      .json({ error: "client_id, user_id e items são obrigatórios!" });
  }

  const t = await sequelize.transaction();

  try {
    const [clientExists, userExists] = await Promise.all([
      Client.findByPk(client_id, { transaction: t }),
      User.findByPk(user_id, { transaction: t }),
    ]);

    if (!clientExists || !userExists) {
      await t.rollback();
      return res.status(400).json({ error: "Cliente ou usuário inválido!" });
    }

    const ids = items.map((i) => i.product_id);
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length !== ids.length) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "Há itens duplicados na lista de produtos!" });
    }

    const products = await Product.findAll({
      where: { id_produto: uniqueIds },
      transaction: t,
    });
    if (products.length !== uniqueIds.length) {
      await t.rollback();
      return res.status(400).json({ error: "Algum produto não existe." });
    }

    for (const item of items) {
      const product = products.find((p) => p.id_produto === item.product_id);
      if (!product) {
        await t.rollback();
        return res
          .status(400)
          .json({ error: `Produto ID ${item.product_id} não encontrado.` });
      }
      if (typeof item.amount !== "number" || item.amount <= 0) {
        await t.rollback();
        return res.status(400).json({
          error: `Quantidade inválida para o produto ${product.nome}`,
        });
      }
      if (product.quantidade < item.amount) {
        await t.rollback();
        return res.status(400).json({
          error: `Estoque insuficiente para o produto: ${product.nome}`,
        });
      }
      if (!item.unit_price || Number(item.unit_price) <= 0) {
        await t.rollback();
        return res
          .status(400)
          .json({ error: `Preço inválido para o produto: ${product.nome}` });
      }
    }

    const total_value = items.reduce(
      (sum, item) => sum + item.amount * Number(item.unit_price),
      0,
    );

    const sale = await Sale.create(
      { client_id, user_id, payment_type, total_value, status: "Aberto" },
      { transaction: t },
    );

    for (const item of items) {
      await ItemSold.create(
        {
          sale_id: sale.sale_id,
          product_id: item.product_id,
          amount: item.amount,
          unit_price: item.unit_price,
        },
        { transaction: t },
      );
      await Product.update(
        {
          quantidade: sequelize.literal(`quantidade_estoque - ${item.amount}`),
        },
        { where: { id_produto: item.product_id }, transaction: t },
      );
    }

    await t.commit();
    return res.status(201).json({
      message: "Venda criada com sucesso!",
      sale_id: sale.sale_id,
      total_value,
    });
  } catch (err) {
    if (t) await t.rollback();
    console.error("createSale error:", err);
    return res
      .status(500)
      .json({ error: "Erro ao criar venda. Tente novamente." });
  }
}

export async function listSales(req, res) {
  try {
    const {
      page = 1,
      client_id,
      user_id,
      status,
      startDate,
      endDate,
      limit = 10,
    } = req.query;
    const l = parseInt(limit, 10) || 10;
    const offset = (parseInt(page, 10) - 1) * l;

    const where = {};
    if (client_id) where.client_id = client_id;
    if (user_id) where.user_id = user_id;
    if (status) where.status = status;

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(`${endDate} 23:59:59`);
    }

    const { count, rows } = await Sale.findAndCountAll({
      where,
      limit: l,
      offset,
      order: [["sale_id", "DESC"]],
      include: [
        { model: Client, attributes: ["id_cliente", "nome"] },
        { model: User, attributes: ["id", "name"] },
        {
          model: ItemSold,
          attributes: ["item_id", "product_id", "amount", "unit_price"],
        },
      ],
    });

    return res.json({
      page: Number(page),
      total: count,
      pages: Math.ceil(count / l),
      sales: rows,
    });
  } catch (err) {
    console.error("listSales error", err);
    return res.status(500).json({ error: "Erro ao listar vendas" });
  }
}

export async function findSale(req, res) {
  const { id } = req.params;

  try {
    const sale = await Sale.findByPk(id, {
      include: [
        { model: Client },
        { model: User, attributes: { exclude: ["password"] } },
        { model: ItemSold, include: [{ model: Product }] },
      ],
    });

    if (!sale) return res.status(404).json({ error: "Venda não encontrada" });
    return res.json({ sale });
  } catch (err) {
    console.error("findSale error", err);
    return res.status(500).json({ error: "Erro ao buscar venda" });
  }
}

export async function listItems(req, res) {
  const { id } = req.params;
  try {
    const items = await ItemSold.findAll({
      where: { sale_id: id },
      include: [{ model: Product }],
    });
    return res.json({ items });
  } catch (err) {
    console.error("listItems error", err);
    return res.status(500).json({ error: "Erro ao listar itens" });
  }
}

export async function addItem(req, res) {
  const { id } = req.params; // sale id
  const { product_id, amount, unit_price } = req.body;
  const t = await sequelize.transaction();

  try {
    const product = await Product.findByPk(product_id, { transaction: t });
    if (!product) {
      await t.rollback();
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    if (product.quantidade < amount) {
      await t.rollback();
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    await ItemSold.create(
      { sale_id: id, product_id, amount, unit_price },
      { transaction: t },
    );
    await Product.update(
      { quantidade: sequelize.literal(`quantidade_estoque - ${amount}`) },
      { where: { id_produto: product_id }, transaction: t },
    );

    await t.commit();
    return res.status(201).json({ message: "Item adicionado" });
  } catch (err) {
    if (t) await t.rollback();
    console.error("addItem error", err);
    return res.status(500).json({ error: "Erro ao adicionar item" });
  }
}

export async function updateItem(req, res) {
  const { id, itemId } = req.params; // id = sale id
  const { amount } = req.body;
  const t = await sequelize.transaction();

  try {
    const item = await ItemSold.findByPk(itemId, { transaction: t });
    if (!item) {
      await t.rollback();
      return res.status(404).json({ error: "Item não encontrado" });
    }
    if (String(item.sale_id) !== String(id)) {
      await t.rollback();
      return res.status(400).json({ error: "Item não pertence a venda" });
    }

    const product = await Product.findByPk(item.product_id, { transaction: t });
    const diff = amount - item.amount; // positive -> need to decrease stock
    if (diff > 0 && product.quantidade < diff) {
      await t.rollback();
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    // update stock
    await Product.update(
      { quantidade: sequelize.literal(`quantidade_estoque - ${diff}`) },
      { where: { id_produto: product.id_produto }, transaction: t },
    );
    await item.update({ amount }, { transaction: t });

    await t.commit();
    return res.json({ message: "Item atualizado" });
  } catch (err) {
    if (t) await t.rollback();
    console.error("updateItem error", err);
    return res.status(500).json({ error: "Erro ao atualizar item" });
  }
}

export async function paySale(req, res) {
  const { id } = req.params;
  const { payment_type, installments, amount } = req.body;

  try {
    const sale = await Sale.findByPk(id);
    if (!sale) return res.status(404).json({ error: "Venda não encontrada" });

    // update payment fields as needed
    await Sale.update(
      {
        payment_type: payment_type || sale.payment_type,
        status: "Transmitido",
      },
      { where: { sale_id: id } },
    );

    return res.json({ message: "Pagamento registrado e venda transmitida" });
  } catch (err) {
    console.error("paySale error", err);
    return res.status(500).json({ error: "Erro ao registrar pagamento" });
  }
}

export async function cancelSale(req, res) {
  const { id } = req.params;
  const t = await sequelize.transaction();

  try {
    const sale = await Sale.findByPk(id, {
      include: [{ model: ItemSold }],
      transaction: t,
    });
    if (!sale) {
      await t.rollback();
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    const items = sale.ItemSolds || sale.items || [];
    for (const it of items) {
      const qty = it.amount || it.quantidade || 0;
      await Product.update(
        { quantidade: sequelize.literal(`quantidade_estoque + ${qty}`) },
        {
          where: { id_produto: it.product_id || it.id_produto },
          transaction: t,
        },
      );
    }

    await ItemSold.destroy({ where: { sale_id: id }, transaction: t });

    await Sale.update(
      { status: "Cancelado" },
      { where: { sale_id: id }, transaction: t },
    );

    await t.commit();
    return res.json({ message: "Venda cancelada com sucesso" });
  } catch (err) {
    if (t) await t.rollback();
    console.error("cancelSale error", err);
    return res.status(500).json({ error: "Erro ao cancelar venda" });
  }
}

export async function transmitBatch(req, res) {
  const { orcamentoInicio, orcamentoFim } = req.body;
  if (
    typeof orcamentoInicio === "undefined" ||
    typeof orcamentoFim === "undefined"
  ) {
    return res
      .status(400)
      .json({ error: "orcamentoInicio e orcamentoFim são obrigatórios" });
  }

  try {
    const [updated] = await Sale.update(
      { status: "Transmitido" },
      {
        where: {
          sale_id: { [Op.between]: [orcamentoInicio, orcamentoFim] },
          status: "Aberto",
        },
      },
    );
    return res.json({ message: `Transmitidas ${updated} vendas` });
  } catch (err) {
    console.error("transmitBatch error", err);
    return res.status(500).json({ error: "Erro ao transmitir lote" });
  }
}

export async function monitorBatch(req, res) {
  const { rpsInicio, rpsFim } = req.body;
  if (typeof rpsInicio === "undefined" || typeof rpsFim === "undefined") {
    return res
      .status(400)
      .json({ error: "rpsInicio e rpsFim são obrigatórios" });
  }

  try {
    const [updated] = await Sale.update(
      { status: "Monitorado" },
      {
        where: {
          sale_id: { [Op.between]: [rpsInicio, rpsFim] },
          status: "Transmitido",
        },
      },
    );
    return res.json({ message: `Monitoradas ${updated} vendas` });
  } catch (err) {
    console.error("monitorBatch error", err);
    return res.status(500).json({ error: "Erro ao monitorar lote" });
  }
}
