/** @format */

import Validator from 'validator'

import { isEmpty } from '../utils/objectHelpers'

export const validateName = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateStart = (value, mode, item) => {
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
}

export const validateEnd = (value, mode, item) => {
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
}

export const validateCalendarId = (value, mode, item) => {}

export const validateReady = (value, mode, item) => {
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

  const nameError = validateName(data.name, mode, data)
  if (nameError) errors.name = nameError

  const startError = validateStart(data.start, mode, data)
  if (startError) errors.start = startError

  const endError = validateEnd(data.end, mode, data)
  if (endError) errors.end = endError

  const readyError = validateReady(data.ready, mode, data)
  if (readyError) errors.ready = readyError

  return !isEmpty(errors) ? errors : null
}
