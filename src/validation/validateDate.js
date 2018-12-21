import Validator from "validator";
import isEmpty from "./is-empty";

// br date validation
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

// br year requeried validation
export const validateYearRequired = year => {
  year = !isEmpty(year) ? year : "";
  let error;

  if (!Validator.matches(year, /^\d{4}$/)) {
    error = "Formato inválido. Deve estar no formato AAAA";
  }

  if (Validator.isEmpty(year)) {
    error = "Este campo é requerido.";
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
