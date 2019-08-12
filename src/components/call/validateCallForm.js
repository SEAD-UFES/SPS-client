import moment from "moment";
import { isEmpty, validateProcessNumber, validateDateRequired } from "../../validation";

// create call validation
export const validateCallForm = data => {
  let errors = {};
  let field = {};

  field = validateProcessNumber(data.number);
  if (!field.isValid) {
    errors.number = field.error;
  }

  field = validateOpeningDate(data.openingDate, data.endingDate);
  if (!field.isValid) {
    errors.openingDate = field.error;
  }

  field = validateEndingDate(data.openingDate, data.endingDate);
  if (!field.isValid) {
    errors.endingDate = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

//openingDate validation####################
export const validateOpeningDate = (openingDate, endingDate) => {
  openingDate = !isEmpty(openingDate) ? openingDate : "";
  endingDate = !isEmpty(endingDate) ? endingDate : "";

  let { error } = validateDateRequired(openingDate);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (!isEmpty(openingDate) && moment(openingDate, "YYYY-MM-DD") > moment(endingDate, "YYYY-MM-DD")) {
      error = "Abertura posterior a encerramento da chamada";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};

//openingDate validation####################
export const validateEndingDate = (openingDate, endingDate) => {
  openingDate = !isEmpty(openingDate) ? openingDate : "";
  endingDate = !isEmpty(endingDate) ? endingDate : "";

  let { error } = validateDateRequired(openingDate);

  if (isEmpty(error)) {
    //deve ser depois da abertura das inscrições
    if (!isEmpty(endingDate) && moment(endingDate, "YYYY-MM-DD") < moment(openingDate, "YYYY-MM-DD")) {
      error = "Encerramento anterior a abertura da chamada";
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  };
};
