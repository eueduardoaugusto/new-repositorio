import { sequelize } from "../config/database.js";
import { Invoice } from "../models/index.js";

export async function createBulkInvoices(req, res) {
  const { saleIds, rpsInicial, rpsFinal } = req.body;

  if (!saleIds || saleIds.length === 0 || !rpsInicial || !rpsFinal) {
    return res.status(400).json({
      message: "IDs de venda e números de RPS inicial/final são obrigatórios.",
    });
  }

  const t = await sequelize.transaction();
  const createdInvoices = [];

  try {
    let currentRps = parseInt(rpsInicial);

    for (const saleId of saleIds) {
      const invoice = await Invoice.create(
        {
          saleId: saleId,
          rpsNumber: currentRps.toString(),
          nfseNumber: "",
          issueDate: new Date(),
        },
        { transaction: t },
      );

      createdInvoices.push(invoice);
      currentRps++;
    }

    await t.commit();
    return res.status(201).json({
      message: `${createdInvoices.length} Faturas/RPS criadas com sucesso.`,
      rps_start: rpsInicial,
      rps_end: currentRps - 1,
    });
  } catch (err) {
    await t.rollback();
    console.error("Erro na criação em lote de faturas:", err);
    return res.status(500).json({ error: err.message });
  }
}
