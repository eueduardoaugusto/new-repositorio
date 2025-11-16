import express from "express";
import { listarClientes, buscarCliente, criarCliente, atualizarCliente, deletarCliente } from "../controllers/clientController.js";
import authGuard from "../middleware/authGuard.js";
import {filtrarCliente} from "../controllers/clientFilters.js"

const router = express.Router();

router.use(authGuard);

router.get("/", listarClientes);
router.get("/filtro" , filtrarCliente)
router.get("/:id", buscarCliente);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.delete("/:id", deletarCliente);

export default router;
