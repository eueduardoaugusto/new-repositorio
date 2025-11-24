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
import { calculateSaleStatus } from "../utils/calculateSaleStatus.js";

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

export async function getAll(req, res) {
  try {
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
