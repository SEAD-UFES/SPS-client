/** @format */

import { isEmpty, validateName, validateSurname, validateCpfRequired, validateDate } from '../../validation'
import { validateMotherName } from '../../validation/person'

// Register validation
export const validateProfileEditPersonForm = data => {
  let errors = {}
  let field = {}

  //nome
  field = validateName(data.name)
  if (!field.isValid) {
    errors.name = field.error
  }

  //sobrenome
  field = validateSurname(data.surname)
  if (!field.isValid) {
    errors.surname = field.error
  }

  //cpf
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

  //data
  field = validateDate(data.birthdate)
  if (!field.isValid) {
    errors.birthdate = field.error
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
