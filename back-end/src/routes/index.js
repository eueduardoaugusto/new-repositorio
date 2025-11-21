import { Router } from "express";
import authRoutes from "./authRoutes.js";
import clienteRoutes from "./clientRoutes.js";
import userRoutes from "./userRoutes.js";
import produtosRoutes from "./productsRoutes.js";
import supplierRoutes from "./supplierRoutes.js";
import cadastroSetor from "./setorRoutes.js";
import cadastroGrupo from "./groupRoutes.js";
import salesRoutes from "./salesRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/clientes", clienteRoutes);
router.use("/user", userRoutes);
router.use("/produtos", produtosRoutes);
router.use("/supplier", supplierRoutes);
router.use("/sale", salesRoutes);
router.use("/setor", cadastroSetor);
router.use("/grupos", cadastroGrupo);

router.get("/", (req, res) => {
  res.status(200).json({ message: "API is Working!" });
});

export default router;
