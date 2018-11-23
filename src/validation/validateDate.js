import Validator from "validator";
import isEmpty from "./is-empty";

// Name validation
export const validateDate = date => {
  date = !isEmpty(date) ? date : "";
  let error;

  if (!isEmpty(date)) {
    if (
      !Validator.matches(
        date,
        /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/
      )
    ) {
      error = "Formato inválido. Deve estar no formato DD/MM/AAAA";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
