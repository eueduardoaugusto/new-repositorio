import express from "express";
import {
  listarProduto,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  buscarProdutoPorCodigo,
} from "../controllers/productsController.js";
import { filtrarProduto } from "../controllers/productFilters.js";
import authGuard from "../middleware/authGuard.js";

const router = express.Router();

router.use(authGuard);

router.get("/", listarProduto);
router.get("/filtro", filtrarProduto);
router.get("/:id", buscarProduto);
router.get("/barcode/:code", buscarProdutoPorCodigo);
router.post("/", criarProduto);
router.put("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

export default router;
