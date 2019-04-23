import { isEmpty, validateEmailRequired, validatePassword, validatePasswordCheck } from "../../validation";

// Register validation
export const validateProfileEditUserForm = data => {
  let errors = {};
  let field = {};

  field = validateEmailRequired(data.email);
  if (!field.isValid) {
    errors.email = field.error;
  }

  if (data.changePassword === true) {
    field = validatePassword(data.password);
    if (!field.isValid) {
      errors.password = field.error;
    }

    field = validatePasswordCheck(data.password2, data.password);
    if (!field.isValid) {
      errors.password2 = field.error;
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
