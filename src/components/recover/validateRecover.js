import Validator from 'validator'
import { isEmpty } from 'validation'

// token validation
export const validateToken = token => {
  token = !isEmpty(token) ? token : ''
  let error

  if (Validator.isEmpty(token)) {
    error = 'Este campo é requerido.'
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}

// PasswordCheck validation
export const validatePasswordCheck = (password1, password2) => {
  password1 = !isEmpty(password1) ? password1 : ''
  password2 = !isEmpty(password2) ? password2 : ''
  let error

  if (password2 !== password1) {
    error = 'As senhas devem ser iguais.'
  }

  if (!Validator.isLength(password1, { min: 6 })) {
    error = 'Senha deve um mínimo de 6 caracteres.'
  }

  if (Validator.isEmpty(password1)) {
    error = 'Este campo é requerido.'
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}

// validate Password form
export const validatePasswordForm = data => {
  let errors = {}
  let field = {}

  field = validatePasswordCheck(data.password, data.passwordCheck)
  if (!field.isValid) {
    errors.password = field.error
  }

  field = validatePasswordCheck(data.passwordCheck, data.password)
  if (!field.isValid) {
    errors.passwordCheck = field.error
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
