import Validator from 'validator'
import isEmpty from './is-empty'

// Name validation
export const validateProcessNumber = number => {
  number = !isEmpty(number) ? number : ''
  let error

  // if (!Validator.matches(number, /^\d{3}$/)) {
  //   error = "Formato inválido. Deve estar no formato 000";
  // }

  if (Validator.isEmpty(number)) {
    error = 'Este campo é requerido.'
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}
