/** @format */

import {
  isEmpty,
  validateName,
  validateSurname,
  validateCpfRequired,
  validateEmailRequired,
  validatePassword,
  validatePasswordCheck
} from '../../validation'
import { validateMotherName } from '../../validation/person'

// Register validation
export const validateRegisterForm = data => {
  let errors = {}
  let field = {}

  field = validateName(data.name)
  if (!field.isValid) {
    errors.name = field.error
  }

  field = validateSurname(data.surname)
  if (!field.isValid) {
    errors.surname = field.error
  }

  field = validateCpfRequired(data.cpf)
  if (!field.isValid) {
    errors.cpf = field.error
  }

  //motherName
  const motherNameError = validateMotherName(data.motherName)
  field = { isValid: motherNameError ? false : true, error: motherNameError }
  if (!field.isValid) {
    errors.motherName = field.error
  }

  field = validateEmailRequired(data.email)
  if (!field.isValid) {
    errors.email = field.error
  }

  field = validatePassword(data.password)
  if (!field.isValid) {
    errors.password = field.error
  }

  field = validatePasswordCheck(data.password2, data.password)
  if (!field.isValid) {
    errors.password2 = field.error
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
