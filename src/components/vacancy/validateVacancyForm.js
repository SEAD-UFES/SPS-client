import Validator from "validator";
import { isEmpty, validateNumberRequired } from "../../validation";

//####################################################################################//
export const validateVacancyForm = data => {
  let errors = {};
  let field = {};

  field = validateAssignment_id(data.assignment_id);
  if (!field.isValid) {
    errors.assignment_id = field.error;
  }

  field = validateNumberRequired(data.qtd);
  if (!field.isValid) {
    errors.qtd = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

//####################################################################################//
export const validateAssignment_id = assignment_id => {
  let error = "";
  if (Validator.isEmpty(assignment_id)) {
    error = "Este campo é requerido.";
  }
  return {
    error: error,
    isValid: isEmpty(error)
  };
};
