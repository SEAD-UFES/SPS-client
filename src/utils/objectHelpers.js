/** @format */

import _ from 'lodash'

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export const convertObjetsToOptions = (objList, options = {}) => {
  const name = options.label || 'name'
  const value = options.value || 'id'
  return objList.map(obj => ({ label: obj[name], value: obj[value] }))
}

export const getEmptyKeys = obj => {
  return Object.keys(obj).filter(key => typeof obj[key] === 'undefined' || obj[key] === null)
}

export const removeEmptyKeys = obj => {
  const emptyKeys = getEmptyKeys(obj)
  if (!isEmpty(emptyKeys)) return _.omit(obj, emptyKeys)
  else return obj
}

export const checkNested = (obj, level, ...rest) => {
  if (isEmpty(obj)) return false
  if (rest.length === 0 && obj.hasOwnProperty(level) && obj[level] !== null) return true
  return checkNested(obj[level], ...rest)
}

export const getNested = (obj, ...args) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
}
