import {
  Sale,
  ItemSold,
  PaymentParcel,
  Invoice,
  Budget,
  Client,
  Product,
} from "../models/index.js";
import { sequelize } from "../config/database.js";

/* ----------------------------------------
   CREATE SALE
----------------------------------------- */
export async function create(req, res) {
  const t = await sequelize.transaction();

  try {
    const {
      budgetId,
      clientId,
      userId,
      totalValue,
      issueDate,
      type,
      installments,
      items,
      invoice,
      payment_parcels,
    } = req.body;

    // 1. Create Sale (NOMES EXATOS DO MODEL!!)
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

    // 2. Itens vendidos
    if (items) {
      for (const item of items) {
        await ItemSold.create(
          {
            saleId: sale.sale_id,
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

    // 3. Nota fiscal
    let createdInvoice = null;

    if (invoice) {
      createdInvoice = await Invoice.create(
        {
          saleId: sale.sale_id,
          rpsNumber: invoice.rpsNumber,
          nfseNumber: invoice.nfseNumber,
          issueDate: invoice.issueDate,
        },
        { transaction: t },
      );
    }

    // 4. Parcelas
    if (payment_parcels) {
      for (const p of payment_parcels) {
        await PaymentParcel.create(
          {
            saleId: sale.sale_id,
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

/* ----------------------------------------
   GET ALL
----------------------------------------- */
export async function getAll(req, res) {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: Client },
        { model: Budget },
        { model: Invoice },
        { model: PaymentParcel },
        { model: ItemSold, include: [Product] },
      ],
    });

    return res.json(sales);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* ----------------------------------------
   GET ONE
----------------------------------------- */
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
      ],
    });

    if (!sale) return res.status(404).json({ message: "Sale not found" });

    return res.json(sale);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* ----------------------------------------
   UPDATE
----------------------------------------- */
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

    // Replace items
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

    // Replace invoice
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

    // Replace parcels
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

/* ----------------------------------------
   DELETE
----------------------------------------- */
export async function remove(req, res) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const sale = await Sale.findByPk(id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

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
