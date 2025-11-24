import { ItemSold, Product } from "../models/index.js";

export async function addItem(req, res) {
  try {
    const item = await ItemSold.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getItemsBySale(req, res) {
  try {
    const { saleId } = req.params;

    const items = await ItemSold.findAll({
      where: { saleId },
      include: [{ model: Product }],
    });

    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removeItem(req, res) {
  try {
    const { id } = req.params;

    const deleted = await ItemSold.destroy({ where: { itemSold_id: id } });

    if (!deleted) return res.status(404).json({ message: "Item not found" });

    return res.json({ message: "Item removed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
