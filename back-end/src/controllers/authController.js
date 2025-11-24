import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { createSession } from "../lib/session.js";
import { encryptPassword } from "../utils/passwordEncryption.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(409)
        .json({ errors: ["O e-mail fornecido já existe."] });
    }

    const passwordHash = await encryptPassword(password);

    const user = await User.create({ name, email, password: passwordHash });

    await createSession(res, user.id, user.role);
    return res.status(200).json({
      message: "Cadastro realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
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

    // Cria o cookie de sessão
    await createSession(res, user.id, user.role);

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
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

export function me(req, res) {
  return res.status(200).json({ user: req.user });
}
