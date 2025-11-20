import express from "express";
import {
  listarGrupos,
  buscarGrupos,
  criarGrupos,
  atualizarGrupos,
  deletarGrupos,
  listarGruposPorSetor,
} from "../controllers/groupControllers.js";
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
