/** @format */

export const convertObjetsToOptions = (objList, options = {}) => {
  const name = options.label || 'name'
  const value = options.value || 'id'
  return objList.map(obj => ({ label: obj[name], value: obj[value] }))
}
