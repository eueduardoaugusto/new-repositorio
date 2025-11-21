// FILE: src/routes/sales.routes.js
import { Router } from "express";

import {
  listSales,
  listItems,
  createSale,
  findSale,
  addItem,
  updateItem,
  paySale,
  cancelSale,
  transmitBatch,
  monitorBatch,
} from "../controllers/sales/saleCreateController.js";

const router = Router();

router.get("/", listSales);
router.get("/:id", findSale);

router.post("/", createSale);
router.post("/:id/pay", paySale);
router.post("/:id/cancel", cancelSale);

router.post("/transmit", transmitBatch);
router.post("/monitor", monitorBatch);

router.get("/:id/items", listItems);
router.post("/:id/items", addItem);
router.patch("/:id/items/:itemId", updateItem);

export default router;
