import { isEmpty, validateName } from '../../validation'

// Register validation
export const validateGraduationTypeForm = data => {
  let errors = {}
  let field = {}

  field = validateName(data.name)
  if (!field.isValid) {
    errors.name = field.error
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
