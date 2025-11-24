import express from "express";
import {
  atualizarGrupos,
  buscarGrupos,
  criarGrupos,
  deletarGrupos,
  listarGrupos,
  listarGruposPorSetor,
} from "../controllers/groupController.js";
import authGuard from "../middleware/authGuard.js";

const router = express.Router();

router.use(authGuard);

router.get("/", listarGrupos);
router.get("/:id", buscarGrupos);
router.post("/", criarGrupos);
router.put("/:id", atualizarGrupos);
router.delete("/:id", deletarGrupos);
router.get("setor/:id", listarGruposPorSetor);

export default router;
