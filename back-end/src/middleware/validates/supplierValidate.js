import { body } from "express-validator";

const supplierValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("cnpj")
      .optional()
      .isString()
      .withMessage("O CNPJ deve ser uma string.")
      .isLength({ min: 14, max: 18 })
      .withMessage(
        "O CNPJ deve ter entre 14 e 18 caracteres (incluindo máscara).",
      ),
    body("phone")
      .optional()
      .isString()
      .withMessage("O telefone deve ser uma string.")
      .isLength({ min: 8 })
      .withMessage("O telefone deve ter no mínimo 8 caracteres."),
    body("email")
      .optional()
      .isString()
      .withMessage("O e-mail deve ser uma string.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("address")
      .optional()
      .isString()
      .withMessage("O endereço deve ser uma string.")
      .isLength({ min: 5 })
      .withMessage("O endereço deve ter no mínimo 5 caracteres."),
  ];
};

export default supplierValidation;
