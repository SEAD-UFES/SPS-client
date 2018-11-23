import Validator from "validator";
import isEmpty from "./is-empty";

// Name validation
export const validateName = name => {
  name = !isEmpty(name) ? name : "";
  let error;

  if (Validator.isEmpty(name)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
