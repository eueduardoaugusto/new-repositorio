import { Invoice, Sale } from "../models/index.js";

export async function create(req, res) {
  try {
    const invoice = await Invoice.create(req.body);
    return res.status(201).json(invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findAll(req, res) {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Sale, attributes: ["sale_id", "totalValue", "issueDate"] },
      ],
    });

    return res.json(invoices);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findOne(req, res) {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByPk(id);

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    return res.json(invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    const [updated] = await Invoice.update(req.body, {
      where: { invoice_id: id },
    });

    if (!updated) return res.status(404).json({ message: "Invoice not found" });

    return res.json({ message: "Invoice updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteInvoice(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Invoice.destroy({ where: { invoice_id: id } });

    if (!deleted) return res.status(404).json({ message: "Invoice not found" });

    return res.json({ message: "Invoice deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
