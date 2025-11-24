import { Router } from "express";
import {
  create as createParcel,
  deletePaymentParcel,
  findAll as findAllParcels,
  findOne as findOneParcel,
  update as updateParcel,
} from "../controllers/paymentParcelController.js";

const router = Router();

router.get("/", findAllParcels);
router.get("/:id", findOneParcel);
router.post("/", createParcel);
router.put("/:id", updateParcel);
router.delete("/:id", deletePaymentParcel);

export default router;
