import { isEmpty, validateName } from "validation";

export const validateUserRoleForm = data => {
  let errors = {};
  let field = {};

  field = validateName(data.user_id);
  if (!field.isValid) {
    errors.user_id = field.error;
  }

  field = validateName(data.roleType_id);
  if (!field.isValid) {
    errors.roleType_id = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
