import { body, check, oneOf } from "express-validator";

const registerClientValidate = () => {
  return [
    body("nome")
      .notEmpty()
      .withMessage("O nome é obrigatório.")
      .isString()
      .withMessage("O nome deve ser um texto."),

    body("cpf")
      .notEmpty()
      .withMessage("O CPF é obrigatório.")
      .isNumeric()
      .withMessage("O CPF deve conter apenas números.")
      .isLength({ min: 11, max: 11 })
      .withMessage("O CPF deve ter 11 dígitos."),

    body("cep")
      .notEmpty()
      .withMessage("O CEP é obrigatório.")
      .isPostalCode("BR")
      .withMessage("O CEP deve ser um código postal válido."),

    body("logadouro")
      .notEmpty()
      .withMessage("O logadouro é obrigatório.")
      .isString(),

    body("endereco")
      .notEmpty()
      .withMessage("O endereço é obrigatório.")
      .isString(),

    body("numero").notEmpty().withMessage("O número é obrigatório.").isString(),

    body("cidade").notEmpty().withMessage("A cidade é obrigatória.").isString(),

    body("estado")
      .notEmpty()
      .withMessage("O estado é obrigatório.")
      .isString()
      .isLength({ min: 2, max: 2 })
      .withMessage("O estado deve ter 2 letras (sigla)."),

    body("email")
      .notEmpty()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("O e-mail deve ser válido."),

    body("telefone")
      .notEmpty()
      .withMessage("O telefone é obrigatório.")
      .isMobilePhone("pt-BR")
      .withMessage("O telefone deve ser válido."),

    body("complemento").optional().isString(),

    // 🐾 VALIDAÇÃO CONDICIONAL DO PET
    body().custom((value) => {
      const hasAnyPetField =
        value.pet_nome ||
        value.pet_especie ||
        value.pet_raca ||
        value.pet_idade;

      const hasAllPetFields =
        value.pet_nome &&
        value.pet_especie &&
        value.pet_raca &&
        value.pet_idade;

      if (hasAnyPetField && !hasAllPetFields) {
        throw new Error(
          "Se qualquer campo de pet for informado, todos (pet_nome, pet_especie, pet_raca, pet_idade) são obrigatórios.",
        );
      }
      return true;
    }),
  ];
};

export default registerClientValidate;
