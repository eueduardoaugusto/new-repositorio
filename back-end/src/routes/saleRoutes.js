import { Router } from "express";

import {
  create as createSale,
  getAll,
  getOne,
} from "../controllers/saleController.js";

import {
  create as createBudget,
  deleteBudget,
  findAll as findAllBudgets,
  findOne as findOneBudget,
  update as updateBudget,
} from "../controllers/budgetController.js";

import {
  create as createInvoice,
  deleteInvoice,
  findAll as findAllInvoices,
  findOne as findOneInvoice,
  update as updateInvoice,
} from "../controllers/invoiceController.js";

import {
  create as createParcel,
  deletePaymentParcel,
  findAll as findAllParcels,
  findOne as findOneParcel,
  update as updateParcel,
} from "../controllers/paymentParcelController.js";

import {
  addItem,
  getItemsBySale,
  removeItem,
} from "../controllers/itemSoldController.js";

const router = Router();

router.get("/budgets", findAllBudgets);
router.get("/budgets/:id", findOneBudget);
router.post("/budgets", createBudget);
router.put("/budgets/:id", updateBudget);
router.delete("/budgets/:id", deleteBudget);

router.get("/invoices", findAllInvoices);
router.get("/invoices/:id", findOneInvoice);
router.post("/invoices", createInvoice);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

router.get("/parcels", findAllParcels);
router.get("/parcels/:id", findOneParcel);
router.post("/parcels", createParcel);
router.put("/parcels/:id", updateParcel);
router.delete("/parcels/:id", deletePaymentParcel);

router.post("/itemsold", addItem);
router.delete("/itemsold/:id", removeItem);
router.get("/:saleId/items", getItemsBySale);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createSale);

export default router;
