import { User } from "../models/index.js";
import { encryptPassword } from "../utils/passwordEncryption.js";

export async function register(req, res) {
  const user = req.body;

  try {
    const userExists = await User.findOne({
      where: { email: user.email },
    });

    if (userExists) {
      let errorMessage = "O funcionário já está cadastrado.";

      if (userExists.email === user.email) {
        errorMessage = "O e-mail fornecido já está em uso.";
      }
      return res.status(409).json({ errors: [errorMessage] });
    }

    const passwordHash = await encryptPassword(user.password);

    const newEmployee = await User.create({
      ...user,
      password: passwordHash,
    });

    const employeeResponse = newEmployee.get({ plain: true });
    delete employeeResponse.password;

    return res.status(201).json({
      message: "Funcionário cadastrado com sucesso",
      employee: employeeResponse,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getAllEmployees(req, res) {
  try {
    const employees = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ employees });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getEmployee(req, res) {
  const { id } = req.params;

  try {
    const employee = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ employee });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function deleteEmployee(req, res) {
  const { id } = req.params;

  try {
    await User.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: "Funcionário deletado com sucesso" });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}
