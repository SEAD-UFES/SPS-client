/** @format */

import Validator from 'validator'
import moment from 'moment'
import isEmpty from './is-empty'

export const validateNumber = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateOpeningDate = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a valid date
  if (!Validator.matches(value, /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)) {
    return 'Formato inválido. Deve estar no formato DD/MM/AAAA.'
  }

  //abertura é menor ou igual que a data de encerramento.
  if (moment(value, 'YYYY-MM-DD') > moment(item.endingDate, 'YYYY-MM-DD')) {
    return 'Deve ser menor ou igual data de encerramento.'
  }
}

export const validateEndingDate = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a valid date
  if (!Validator.matches(value, /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)) {
    return 'Formato inválido. Deve estar no formato DD/MM/AAAA.'
  }

  //encerramento é maior ou igual que a data de abertura.
  if (moment(value, 'YYYY-MM-DD') < moment(item.openingDate, 'YYYY-MM-DD')) {
    return 'Deve ser menor ou igual data de encerramento.'
  }
}

export const validateBody = (data, mode) => {
  const errors = {}

  const numberError = validateNumber(data.number, mode, data)
  if (numberError) errors.number = numberError

  const openingDateError = validateOpeningDate(data.openingDate, mode, data)
  if (openingDateError) errors.openingDate = openingDateError

  const endingDateError = validateEndingDate(data.endingDate, mode, data)
  if (endingDateError) errors.endingDate = endingDateError

  return !isEmpty(errors) ? errors : null
}
