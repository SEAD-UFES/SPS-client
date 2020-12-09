/** @format */

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

export const validateBody = (data, mode) => {
  const errors = {}

  const inscriptionEventIdError = validateInscriptionEventId(data.inscriptionEvent_id, mode)
  if (inscriptionEventIdError) errors.inscriptionEvent_id = inscriptionEventIdError

  return !isEmpty(errors) ? errors : null
}
