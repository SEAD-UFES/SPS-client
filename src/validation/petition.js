/** @format */

import Validator from 'validator'

import { isEmpty } from '../utils/objectHelpers'

export const validatePetitionEventId = (value, mode, item) => {
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

export const validateInscriptionId = (value, mode, item) => {
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

export const validateTitle = (value, mode, item) => {
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

export const validateDescription = (value, mode) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  if (!Validator.isLength(value, { min: 20, max: 500 })) {
    return 'Descrição deve ter entre 20 e 500 caracteres'
  }

  //no errors to return
  return null
}

export const validateBody = (data, mode) => {
  const errors = {}

  const petitionEventIdError = validatePetitionEventId(data.petitionEvent_id, mode)
  if (petitionEventIdError) errors.petitionEvent_id = petitionEventIdError

  const inscriptionIdError = validateInscriptionId(data.inscription_id, mode)
  if (inscriptionIdError) errors.inscription_id = inscriptionIdError

  const titleError = validateTitle(data.title, mode)
  if (titleError) errors.title = titleError

  const descriptionError = validateDescription(data.description, mode)
  if (descriptionError) errors.description = descriptionError

  return !isEmpty(errors) ? errors : null
}
