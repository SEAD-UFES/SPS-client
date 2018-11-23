import Validator from "validator";
import isEmpty from "./is-empty";

// Password validation
export const validatePassword = password => {
  password = !isEmpty(password) ? password : "";
  let error;

  if (!Validator.isLength(password, { min: 6 })) {
    error = "Senha deve um mínimo de 6 caracteres.";
  }

  if (Validator.isEmpty(password)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

// PasswordCheck validation
export const validatePasswordCheck = (password2, password1) => {
  password2 = !isEmpty(password2) ? password2 : "";
  let error;

  if (Validator.isEmpty(password2)) {
    error = "Este campo é requerido.";
  }

  if (password2 !== password1) {
    error = "As senhas devem ser iguais.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
