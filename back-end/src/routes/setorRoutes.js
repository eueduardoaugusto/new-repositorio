import express from "express";
import {
  listarSetor,
  atualizarSetor,
  buscarSetor,
  criarSetor,
  deletarSetor,
} from "../controllers/setorController.js";
import authGuard from "../middleware/authGuard.js";

const router = express.Router();

router.use(authGuard);

router.get("/", listarSetor);
router.get("/:id", buscarSetor);
router.post("/", criarSetor);
router.put("/:id", atualizarSetor);
router.delete("/:id", deletarSetor);

export default router;
