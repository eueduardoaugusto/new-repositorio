export default function roleGuard(requiredRoles) {
  const rolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.error(
        "Erro: req.user ou req.user.role não está definido. O authGuard deve ser executado primeiro.",
      );
      return res
        .status(403)
        .json({ errors: ["Acesso negado: Informações de usuário ausentes."] });
    }

    const userRole = req.user.role;

    if (rolesArray.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({
        errors: [`Acesso negado. Role de "${userRole}" não autorizada.`],
        required: rolesArray,
      });
    }
  };
}
