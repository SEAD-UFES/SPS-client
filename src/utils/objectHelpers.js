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
