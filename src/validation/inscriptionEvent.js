/** @format */

import Validator from 'validator'

import { isEmpty } from '../utils/objectHelpers'

export const validateNumberOfInscriptionsAllowed = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a number
  if (typeof value === 'number') value = value.toString()
  if (!Validator.isInt(value)) {
    return 'Deve ser um número.'
  }

  //no errors to return
  return null
}

export const validateAllowMultipleAssignments = (value, mode, item) => {
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

  //no errors to return
  return null
}

export const validateAllowMultipleRegions = (value, mode, item) => {
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

  //no errors to return
  return null
}

export const validateAllowMultipleRestrictions = (value, mode, item) => {
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

  //no errors to return
  return null
}

export const validateBody = (data, mode) => {
  const errors = {}

  const numberOfInscriptionsAllowedError = validateNumberOfInscriptionsAllowed(
    data.numberOfInscriptionsAllowed,
    mode,
    data
  )
  if (numberOfInscriptionsAllowedError) errors.numberOfInscriptionsAllowed = numberOfInscriptionsAllowedError

  const allowMultipleAssignmentsError = validateAllowMultipleAssignments(data.allowMultipleAssignments, mode)
  if (allowMultipleAssignmentsError) errors.allowMultipleAssignments = allowMultipleAssignmentsError

  const allowMultipleRegionsError = validateAllowMultipleRegions(data.allowMultipleRegions, mode)
  if (allowMultipleRegionsError) errors.allowMultipleRegions = allowMultipleRegionsError

  const allowMultipleRestrictionsError = validateAllowMultipleRestrictions(data.allowMultipleRestrictions, mode)
  if (allowMultipleRestrictionsError) errors.allowMultipleRestrictions = allowMultipleRestrictionsError

  return !isEmpty(errors) ? errors : null
}
