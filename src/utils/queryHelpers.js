/** @format */

export const convertArrayToQueryString = (arrayName, simpleArray) => {
  const strings = simpleArray.map(item => `${arrayName}[]=${item}`)
  const result = strings.reduce((acc, cur, idx, src) => {
    const andOp = idx + 1 < src.length ? '&' : ''
    return `${acc}${cur}${andOp}`
  }, '')
  return result
}
