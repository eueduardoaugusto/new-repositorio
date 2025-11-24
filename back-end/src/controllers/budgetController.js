import { Budget, Client, User } from "../models/index.js";

export async function create(req, res) {
  try {
    const budget = await Budget.create(req.body);
    return res.status(201).json(budget);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findAll(req, res) {
  try {
    const budgets = await Budget.findAll({
      include: [
        { model: Client, attributes: ["id_cliente", "nome"] },
        { model: User, attributes: ["id", "name"] },
      ],
    });

    console.log(budgets);

    return res.json(budgets);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findOne(req, res) {
  try {
    const { id } = req.params;

    const budget = await Budget.findByPk(id);

    if (!budget) return res.status(404).json({ message: "Budget not found" });

    return res.json(budget);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Budget.update(req.body, {
      where: { budget_id: id },
    });

    if (!updated) return res.status(404).json({ message: "Budget not found" });

    return res.json({ message: "Budget updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteBudget(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Budget.destroy({ where: { budget_id: id } });

    if (!deleted) return res.status(404).json({ message: "Budget not found" });

    return res.json({ message: "Budget deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
