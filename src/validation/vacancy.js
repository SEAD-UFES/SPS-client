/** @format */

import Validator from 'validator'
import isEmpty from '../validation/is-empty'

export const validateAssignmentId = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateQtd = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a number
  if (!Validator.isNumeric(value)) {
    return 'Deve ser um número.'
  }
}

export const validateRegionId = (value, mode, item) => {}

export const validateRestrictionId = (value, mode, item) => {}

export const validateReserve = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is boolean
  if (value !== true && value !== false && value !== 1 && value !== 0) {
    return 'Deve ser verdadeiro ou falso.'
  }
}

export const validateBody = (data, mode) => {
  const errors = {}

  const assignmentIdError = validateAssignmentId(data.assignment_id, mode, data)
  if (assignmentIdError) errors.assignment_id = assignmentIdError

  const qtdError = validateQtd(data.qtd, mode, data)
  if (qtdError) errors.qtd = qtdError

  const reserveError = validateReserve(data.reserve, mode, data)
  if (reserveError) errors.reserve = reserveError

  return !isEmpty(errors) ? errors : null
}
