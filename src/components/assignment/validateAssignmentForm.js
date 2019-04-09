import { isEmpty, validateName } from "../../validation";

// Register validation
export const validateAssignmentForm = data => {
  let errors = {};
  let field = {};

  field = validateName(data.name);
  if (!field.isValid) {
    errors.name = field.error;
  }

  field = validateName(data.description);
  if (!field.isValid) {
    errors.description = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
