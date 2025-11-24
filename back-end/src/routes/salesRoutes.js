import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  filterSalesByRPS,
  filterSalesByBudgetNumbers,
} from "../controllers/saleController.js";

import {
  addItem,
  getItemsBySale,
  removeItem,
} from "../controllers/itemSoldController.js";

const router = Router();

router.get("/filter/rps-numbers", filterSalesByRPS);
router.get("/filter/budget-numbers", filterSalesByBudgetNumbers);

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

router.post("/itemsold", addItem);
router.delete("/itemsold/:id", removeItem);
router.get("/:saleId/itemsold", getItemsBySale);

export default router;
