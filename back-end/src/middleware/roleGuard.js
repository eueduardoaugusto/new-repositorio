export default function roleGuard(requiredRoles) {
  // Garante que requiredRoles é sempre um array para simplificar a checagem
  const rolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  return (req, res, next) => {
    // 1. Checa se o authGuard rodou antes
    if (!req.user || !req.user.role) {
      // Este erro não deve acontecer se authGuard rodar antes
      console.error(
        "Erro: req.user ou req.user.role não está definido. O authGuard deve ser executado primeiro.",
      );
      return res
        .status(403)
        .json({ errors: ["Acesso negado: Informações de usuário ausentes."] });
    }

    const userRole = req.user.role;

    // 2. Checa se a role do usuário está na lista de roles permitidas
    if (rolesArray.includes(userRole)) {
      // 3. Acesso permitido
      next();
    } else {
      // 4. Acesso negado (403 Forbidden - Autorização)
      return res.status(403).json({
        errors: [`Acesso negado. Role de "${userRole}" não autorizada.`],
        required: rolesArray,
      });
    }
  };
}
