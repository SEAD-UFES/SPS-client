import Validator from "validator";
import isEmpty from "./is-empty";

// Email validation
export const validateEmail = email => {
  email = !isEmpty(email) ? email : "";
  let error;

  if (!isEmpty(email)) {
    if (!Validator.isEmail(email)) {
      error = "Formato inválido. Deve ser um endereço de email.";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

// Email Required validation
export const validateEmailRequired = email => {
  email = !isEmpty(email) ? email : "";

  let { error } = validateEmail(email);

  if (Validator.isEmpty(email)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
