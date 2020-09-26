/** @format */

import Validator from 'validator'

import { isEmpty } from '../utils/objectHelpers'

export const validateInscriptionEventId = (value, mode, item) => {
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

export const validatePersonId = (value, mode, item) => {
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

export const validateVacancyId = (value, mode) => {
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

export const validateBody = (data, mode) => {
  const errors = {}

  const inscriptionIdError = validateInscriptionEventId(data.inscriptionEvent_id, mode)
  if (inscriptionIdError) errors.inscriptionEvent_id = inscriptionIdError

  const personIdError = validatePersonId(data.person_id, mode)
  if (personIdError) errors.person_id = personIdError

  const vacancyIdError = validateVacancyId(data.vacancy_id, mode)
  if (vacancyIdError) errors.vacancy_id = vacancyIdError

  return !isEmpty(errors) ? errors : null
}

export const validateDescription = (value, mode) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value must be > 5 and < 200
  if (!Validator.isLength(value, { min: 20, max: 255 })) {
    return 'A justificativa deve ter entre 20 e 255 caracteres.'
  }

  //no errors to return
  return null
}
