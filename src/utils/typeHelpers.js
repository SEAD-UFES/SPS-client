/** @format */

export const convertBooleanToString = value => {
  if (value === true || value === 1) return 'true'
  if (value === false || value === 0) return 'false'
  return value
}

export const convertStringToBoolean = value => {
  if (value === 'true' || value === '1') return true
  if (value === 'false' || value === '0') return false
  return value
}
