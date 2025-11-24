import { Router } from "express";
import supplierValidation from "../middleware/validates/supplierValidate.js";
import { validate } from "../middleware/validates/handleValidate.js";
import {
  registerSupplier,
  getSupplier,
  getAllSuppliers,
  deleteSupplier,
} from "../controllers/supplierController.js";
import roleGuard from "../middleware/roleGuard.js";
import authGuard from "../middleware/authGuard.js";

const router = Router();

router.use(authGuard);

router.post(
  "/register",
  roleGuard(["admin", "proprietario"]),
  supplierValidation(),
  validate,
  registerSupplier,
);
router.get(
  "/",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getAllSuppliers,
);
router.get(
  "/:id",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getSupplier,
);
router.delete("/:id", roleGuard(["admin", "proprietario"]), deleteSupplier);

export default router;
