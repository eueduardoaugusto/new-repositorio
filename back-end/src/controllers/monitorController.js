import { Op } from "sequelize";
import { Sale, Budget } from "../models/index.js";

export async function filterSalesByBudgetDates(req, res) {
  const { startBudget, endBudget } = req.query;

  if (!startBudget || !endBudget) {
    return res.status(400).json({
      message:
        "Os parâmetros de data de orçamento inicial e final são obrigatórios.",
    });
  }

  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Budget,

          where: {
            issueDate: {
              [Op.between]: [startBudget, endBudget],
            },
          },
          required: true,
          attributes: ["budgetNumber", "issueDate"],
        },
      ],
      attributes: ["sale_id", "totalValue", "issueDate"],
      nest: true,
      raw: false,
    });

    return res.json(sales);
  } catch (error) {
    console.error("Erro ao filtrar vendas por orçamento:", error);
    return res.status(500).json({ error: error.message });
  }
}
