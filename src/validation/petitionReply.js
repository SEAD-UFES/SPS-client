/** @format */

import { isEmpty } from '../utils/objectHelpers'
import { convertBooleanToString } from '../utils/typeHelpers'

export const validatePetitionId = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //no errors to return
  return null
}

export const validateStatus = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is boolean
  if (typeof value !== 'undefined' && !['true', 'false', '0', '1'].includes(value)) {
    return 'Deve ser verdadeiro ou falso.'
  }

  //no errors to return
  return null
}

export const validateJustification = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //tamanho mínimo
  if (typeof value !== 'undefined' && (typeof value !== 'string' || value.length < 5 || value.length >= 255)) {
    return 'A justificativa precisa ter entre 5 e 1024 caracteres.'
  }

  //no errors to return
  return null
}

export const validateBody = (data, mode) => {
  const errors = {}

  const petitionIdError = validatePetitionId(data.petition_id, mode)
  if (petitionIdError) errors.petition_id = petitionIdError

  console.log(data)
  const accepted = convertBooleanToString(data.accepted)
  const acceptedError = validateStatus(accepted, mode)
  if (acceptedError) errors.accepted = acceptedError

  const justificationError = validateJustification(data.justification, mode)
  if (justificationError) errors.justification = justificationError

  return !isEmpty(errors) ? errors : null
}
