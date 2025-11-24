import { Router } from "express";
import {
  create as createInvoice,
  deleteInvoice,
  findAll as findAllInvoices,
  findOne as findOneInvoice,
  update as updateInvoice,
} from "../controllers/invoiceController.js";
import { createBulkInvoices } from "../controllers/transmissionController.js";

const router = Router();

router.post("/bulk-create", createBulkInvoices);
router.get("/", findAllInvoices);
router.get("/:id", findOneInvoice);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
