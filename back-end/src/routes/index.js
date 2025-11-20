import { Router } from "express";
import authRoutes from "./authRoutes.js";
import clienteRoutes from "./clientRoutes.js";
import produtosRoutes from "./productsRoutes.js";
import cadastroSetor from "./sectorRoutes.js";
import cadastroGrupo from "./groupRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clientes", clienteRoutes);
router.use("/produtos", produtosRoutes);
router.use("/setor", cadastroSetor);
router.use("/grupos", cadastroGrupo);

router.get("/", (req, res) => {
  res.status(200).json({ message: "API is Working!" });
});

export default router;
