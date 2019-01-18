import Validator from "validator";
import isEmpty from "./is-empty";

// Name validation
export const validateNumberRequired = number => {
  number = !isEmpty(number) ? number : "";
  let error;

  if (!Validator.isInt(number)) {
    error = "Formato inválido. Deve ser um número.";
  }

  if (Validator.isEmpty(number)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
