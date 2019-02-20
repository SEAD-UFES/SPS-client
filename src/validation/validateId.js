import Validator from "validator";
import isEmpty from "./is-empty";

// Id validation
export const validateId = id => {
  id = !isEmpty(id) ? id : "";
  let error;

  if (Validator.isEmpty(id)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
