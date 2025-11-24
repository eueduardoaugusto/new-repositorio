import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createSession } from "../lib/session.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res
        .status(409)
        .json({ errors: ["O e-mail fornecido já existe."] });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    await createSession(res, user.id);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado"] });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        errors: ["Senha incorreta, Por favor digite uma senha válida"],
      });
    }

    await createSession(res, user.id);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export function logout(req, res) {
  res.clearCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });

  return res.sendStatus(204);
}

export async function me(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não encontrado"] });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    return res.status(500).json({
      errors: ["Erro interno ao carregar usuário"],
    });
  }
}
