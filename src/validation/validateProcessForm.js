import {
  isEmpty,
  validateProcessNumber,
  validateYearRequired,
  validateDescription
} from "./";

// Register validation
export const validateProcessForm = data => {
  let errors = {};
  let field = {};

  field = validateProcessNumber(data.number);
  if (!field.isValid) {
    errors.number = field.error;
  }

  field = validateYearRequired(data.year);
  if (!field.isValid) {
    errors.year = field.error;
  }

  field = validateDescription(data.description);
  if (!field.isValid) {
    errors.description = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
