import { Router } from "express";
import {
  create as createBudget,
  deleteBudget,
  findAll as findAllBudgets,
  findOne as findOneBudget,
  update as updateBudget,
} from "../controllers/budgetController.js";

const router = Router();

router.get("/", findAllBudgets);
router.get("/:id", findOneBudget);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

export default router;
