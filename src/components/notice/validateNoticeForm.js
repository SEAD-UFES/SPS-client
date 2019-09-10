import Validator from 'validator'
import { isEmpty } from '../../validation'

// create notice validation
export const validateNoticeForm = data => {
  let errors = {}
  let field = {}

  field = validateTitle(data.title)
  if (!field.isValid) {
    errors.title = field.error
  }

  field = validateContent(data.content)
  if (!field.isValid) {
    errors.content = field.error
  }

  field = validateVisible(data.visible)
  if (!field.isValid) {
    errors.visible = field.error
  }

  field = validateOverride(data.override)
  if (!field.isValid) {
    errors.override = field.error
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}

//----------------------------------------------------------------//
//validate title
export const validateTitle = title => {
  title = !isEmpty(title) ? title : ''

  let error = null

  if (Validator.isEmpty(title)) {
    error = 'Este campo é requerido.'
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}
//----------------------------------------------------------------//
//validate content
export const validateContent = content => {
  content = !isEmpty(content) ? content : ''

  let error = null

  if (Validator.isEmpty(content)) {
    error = 'Este campo é requerido.'
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}
//----------------------------------------------------------------//
//validate visible
export const validateVisible = visible => {
  let error = null
  if (visible) {
    if (visible !== true && visible !== false) {
      error = 'Valor do campo inválido.'
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}
//----------------------------------------------------------------//
//validate override
export const validateOverride = override => {
  let error = null
  if (override) {
    if (override !== true && override !== false) {
      error = 'Valor do campo inválido.'
    }
  }

  return {
    error: error,
    isValid: isEmpty(error)
  }
}
//----------------------------------------------------------------//
