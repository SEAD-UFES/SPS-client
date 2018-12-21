import Validator from "validator";
import isEmpty from "./is-empty";

// Name validation
export const validateDescription = description => {
  description = !isEmpty(description) ? description : "";
  let error;

  if (!Validator.isLength(description, { min: 20, max: 500 })) {
    error = "Descrição deve ter entre 20 e 500 caracteres";
  }

  if (Validator.isEmpty(description)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
