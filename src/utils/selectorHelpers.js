/** @format */

export const convertObjetsToOptions = (objList, options = {}) => {
  const name = options.label || 'name'
  const value = options.value || 'id'
  return objList.map(obj => ({ label: obj[name], value: obj[value] }))
}

export const numberListOptions = number => {
  const options = new Array(number + 1).fill(0)
  return options.map((item, key) => ({ label: key === 0 ? 'Ilimitado' : key, value: key }))
}
