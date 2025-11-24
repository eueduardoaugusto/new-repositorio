import { Op } from "sequelize"; // ✅ Importação do Operador
import {
  Sale,
  ItemSold,
  PaymentParcel,
  Invoice,
  Budget, // ✅ Importado para o novo filtro
  Client,
  Product,
  // User (Se não estiver no index.js, precisa ser importado explicitamente)
} from "../models/index.js";
import { sequelize } from "../config/database.js";
import { calculateSaleStatus } from "../utils/calculateSaleStatus.js";

// --- CRUD BÁSICO (CREATE) ---
export async function create(req, res) {
  const t = await sequelize.transaction();

  try {
    const {
      budgetId,
      clientId,
      userId, // Assumindo que User também é importado/associado corretamente
      totalValue,
      issueDate,
      type,
      installments,
      items,
      invoice,
      payment_parcels,
    } = req.body;

    const sale = await Sale.create(
      {
        budgetId,
        clientId,
        userId,
        totalValue,
        issueDate,
        type,
        installments,
      },
      { transaction: t },
    );

    if (items) {
      for (const item of items) {
        await ItemSold.create(
          {
            saleId: sale.sale_id, // Usando a PK correta da Venda
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: item.discount,
            finalPrice: item.finalPrice,
          },
          { transaction: t },
        );
      }
    }

    let createdInvoice = null;

    if (invoice) {
      createdInvoice = await Invoice.create(
        {
          saleId: sale.sale_id, // Usando a PK correta da Venda
          rpsNumber: invoice.rpsNumber,
          nfseNumber: invoice.nfseNumber,
          issueDate: invoice.issueDate,
        },
        { transaction: t },
      );
    }

    if (payment_parcels) {
      for (const p of payment_parcels) {
        await PaymentParcel.create(
          {
            saleId: sale.sale_id, // Usando a PK correta da Venda
            method: p.method,
            parcelNumber: p.parcelNumber,
            parcelValue: p.parcelValue,
            dueDate: p.dueDate,
          },
          { transaction: t },
        );
      }
    }

    await t.commit();

    return res.status(201).json({
      sale,
      items,
      invoice: createdInvoice,
      payment_parcels,
    });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
}
// --- BUSCA GERAL (GET ALL) ---
export async function getAll(req, res) {
  try {
    // 💡 OBS: Se 'User' for necessário, certifique-se de importá-lo no topo
    const sales = await Sale.findAll({
      include: [
        { model: Client, attributes: ["nome"] },
        { model: Budget, attributes: ["budgetNumber", "totalValue"] },
        { model: Invoice, attributes: ["rpsNumber", "nfseNumber"] },
        {
          model: PaymentParcel,
          attributes: ["paymentParcel_id", "parcelValue", "method"],
        },
      ],
      attributes: [
        "sale_id",
        "totalValue",
        "issueDate",
        "type",
        "installments",
      ],
      raw: false,
      nest: true,
    });

    const salesWithStatus = sales.map((sale) => {
      const saleData = sale.toJSON();
      saleData.status = calculateSaleStatus(saleData);
      return saleData;
    });

    return res.json(salesWithStatus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// ----------------------------------------------------------------------
// ✅ FUNÇÃO ORIGINAL: FILTRO POR INTERVALO DE RPS
// ----------------------------------------------------------------------
export async function filterSalesByRPS(req, res) {
  const { startRPS, endRPS } = req.query;

  if (!startRPS || !endRPS) {
    return res
      .status(400)
      .json({ message: "Os números de RPS inicial e final são obrigatórios." });
  }

  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Invoice,
          where: {
            rpsNumber: {
              [Op.between]: [startRPS.toString(), endRPS.toString()],
            },
          },
          required: true,
          attributes: ["rpsNumber", "nfseNumber"],
        },
        { model: Client, attributes: ["nome"] },
        { model: Budget, attributes: ["budgetNumber", "totalValue"] },
        {
          model: PaymentParcel,
          attributes: ["paymentParcel_id", "parcelValue", "method"],
        },
      ],
      attributes: [
        "sale_id",
        "totalValue",
        "issueDate",
        "type",
        "installments",
      ],
      nest: true,
      raw: false,
    });

    const salesWithStatus = sales.map((sale) => {
      const saleData = sale.toJSON();
      saleData.status = calculateSaleStatus(saleData);
      return saleData;
    });

    return res.json(salesWithStatus);
  } catch (error) {
    console.error("Erro ao filtrar vendas por RPS:", error);
    return res.status(500).json({ error: error.message });
  }
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 🆕 NOVA FUNÇÃO: FILTRO POR INTERVALO DE ORÇAMENTO (budgetNumber)
// ----------------------------------------------------------------------
export async function filterSalesByBudgetNumbers(req, res) {
  // Recebe startBudget e endBudget via Query Params (ex: ?startBudget=10&endBudget=20)
  const { startBudget, endBudget } = req.query;

  if (!startBudget || !endBudget) {
    return res.status(400).json({
      message: "Os números de Orçamento inicial e final são obrigatórios.",
    });
  }

  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Budget,
          where: {
            // Filtra o budgetNumber (campo JS) entre os valores fornecidos
            budgetNumber: {
              [Op.between]: [startBudget.toString(), endBudget.toString()],
            },
          },
          required: true, // Apenas vendas que possuem Orçamento nesse intervalo
          attributes: ["budgetNumber", "totalValue"],
        },
        // Incluir as associações necessárias para a lista de vendas
        { model: Client, attributes: ["nome"] },
        { model: Invoice, attributes: ["rpsNumber", "nfseNumber"] },
        {
          model: PaymentParcel,
          attributes: ["paymentParcel_id", "parcelValue", "method"],
        },
      ],
      attributes: [
        "sale_id",
        "totalValue",
        "issueDate",
        "type",
        "installments",
      ],
      nest: true,
      raw: false,
    });

    // Mapeia para adicionar o status calculado, como em getAll
    const salesWithStatus = sales.map((sale) => {
      const saleData = sale.toJSON();
      saleData.status = calculateSaleStatus(saleData);
      return saleData;
    });

    return res.json(salesWithStatus);
  } catch (error) {
    console.error("Erro ao filtrar vendas por Orçamento:", error);
    return res.status(500).json({ error: error.message });
  }
}
// ----------------------------------------------------------------------

// --- BUSCA ÚNICA (GET ONE) ---
export async function getOne(req, res) {
  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id, {
      include: [
        { model: Client },
        { model: Budget },
        { model: Invoice },
        { model: PaymentParcel },
        { model: ItemSold, include: [Product] },
        // Incluir o modelo User aqui se necessário
      ],
    });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    return res.json(sale);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// --- ATUALIZAÇÃO (UPDATE) ---
export async function update(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id);

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    const {
      totalValue,
      issueDate,
      type,
      installments,
      items,
      invoice,
      payment_parcels,
    } = req.body;

    await sale.update(
      {
        totalValue,
        issueDate,
        type,
        installments,
      },
      { transaction: t },
    );

    // Atualização de Itens (Destrói e Recria)
    await ItemSold.destroy({ where: { saleId: id }, transaction: t });

    if (items) {
      for (const item of items) {
        await ItemSold.create(
          {
            saleId: id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: item.discount,
            finalPrice: item.finalPrice,
          },
          { transaction: t },
        );
      }
    }

    // Atualização de Invoice (Destrói e Recria)
    await Invoice.destroy({ where: { saleId: id }, transaction: t });

    if (invoice) {
      await Invoice.create(
        {
          saleId: id,
          rpsNumber: invoice.rpsNumber,
          nfseNumber: invoice.nfseNumber,
          issueDate: invoice.issueDate,
        },
        { transaction: t },
      );
    }

    // Atualização de PaymentParcel (Destrói e Recria)
    await PaymentParcel.destroy({ where: { saleId: id }, transaction: t });

    if (payment_parcels) {
      for (const p of payment_parcels) {
        await PaymentParcel.create(
          {
            saleId: id,
            method: p.method,
            parcelNumber: p.parcelNumber,
            parcelValue: p.parcelValue,
            dueDate: p.dueDate,
          },
          { transaction: t },
        );
      }
    }

    await t.commit();

    return res.json({ message: "Sale updated successfully" });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
}

// --- EXCLUSÃO (REMOVE) ---
export async function remove(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    // Destroi dependências antes de destruir a principal
    await ItemSold.destroy({ where: { saleId: id }, transaction: t });
    await Invoice.destroy({ where: { saleId: id }, transaction: t });
    await PaymentParcel.destroy({ where: { saleId: id }, transaction: t });

    await sale.destroy({ transaction: t });

    await t.commit();

    return res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
}
