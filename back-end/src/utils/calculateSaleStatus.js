export function calculateSaleStatus(sale) {
  const hasInvoice = sale.Invoice && sale.Invoice.nfseNumber;
  const totalParcels = sale.installments || 0;

  const paidParcels = sale.PaymentParcels.filter(
    (p) => p.method === "Pago",
  ).length;

  if (totalParcels > 0) {
    if (paidParcels === totalParcels) {
      return { text: "Pago", colorKey: "success" };
    } else if (paidParcels > 0 && paidParcels < totalParcels) {
      return { text: "Parcialmente Pago", colorKey: "warning" };
    }
  }

  if (hasInvoice) {
    return { text: "Faturado", colorKey: "info" };
  }

  return { text: "Pendente", colorKey: "danger" };
}
