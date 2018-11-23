import Validator from "validator";
import isEmpty from "./is-empty";

// Surname validation
export const validateSurname = surname => {
  surname = !isEmpty(surname) ? surname : "";
  let error;

  if (Validator.isEmpty(surname)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
