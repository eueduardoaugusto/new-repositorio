import { decrypt } from "../lib/session.js";

export default async function authGuard(req, res, next) {
  try {
    const session = req.cookies.session;
    if (!session) {
      return res.status(401).json({ errors: ["Usuário não autenticado."] });
    }

    const payload = await decrypt(session);
    if (!payload) {
      return res.status(401).json({ errors: ["Sessão inválida ou expirada"] });
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error("Erro no middleware auth:", error);
    return res.status(500).json({ errors: ["Erro no servidor."] });
  }
}
