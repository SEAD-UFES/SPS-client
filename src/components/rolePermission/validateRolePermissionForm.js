import { isEmpty, validateName } from "validation/";

// Register validation
export const validateRolePermissionForm = data => {
  let errors = {};
  let field = {};

  field = validateName(data.roleType_id);
  if (!field.isValid) {
    errors.roleType_id = field.error;
  }

  field = validateName(data.permission_id);
  if (!field.isValid) {
    errors.permissionType_id = field.error;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
