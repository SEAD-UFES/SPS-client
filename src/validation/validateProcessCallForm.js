import { isEmpty, validateNumberRequired, validateDateRequired } from "./";

// Register validation
export const validateProcessCallForm = data => {
  let errors = {};
  let field = {};

  field = validateNumberRequired(data.number);
  if (!field.isValid) {
    errors.number = field.error;
  }

  field = validateDateRequired(data.inscriptionsStart);
  if (!field.isValid) {
    errors.inscriptionsStart = field.error;
  }

  field = validateDateRequired(data.inscriptionsEnd);
  if (!field.isValid) {
    errors.inscriptionsEnd = field.error;
  }

  field = validateDateRequired(data.callEnd);
  if (!field.isValid) {
    errors.callEnd = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
