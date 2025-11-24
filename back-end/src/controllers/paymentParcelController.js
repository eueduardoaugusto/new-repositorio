import { Sale, PaymentParcel } from "../models/index.js";

export async function create(req, res) {
  try {
    const parcel = await PaymentParcel.create(req.body);
    return res.status(201).json(parcel);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findAll(req, res) {
  try {
    const parcels = await PaymentParcel.findAll({
      include: [{ model: Sale, attributes: ["sale_id", "totalValue"] }],
    });

    return res.json(parcels);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function findOne(req, res) {
  try {
    const { id } = req.params;

    const parcel = await PaymentParcel.findByPk(id);

    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    return res.json(parcel);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    const [updated] = await PaymentParcel.update(req.body, {
      where: { paymentParcel_id: id },
    });

    if (!updated) return res.status(404).json({ message: "Parcel not found" });

    return res.json({ message: "Parcel updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deletePaymentParcel(req, res) {
  try {
    const { id } = req.params;

    const deleted = await PaymentParcel.destroy({
      where: { paymentParcel_id: id },
    });

    if (!deleted) return res.status(404).json({ message: "Parcel not found" });

    return res.json({ message: "Parcel deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
