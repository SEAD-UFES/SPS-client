/** @format */

import { checkNested } from './objectHelpers'

export const convertVacanciesToOptions = vacancies => {
  return vacancies.map(vac => {
    const assignment = checkNested(vac, 'assignment', 'name') ? vac.assignment.name : null
    const region = checkNested(vac, 'region', 'name') ? vac.region.name : 'Sem região'
    const restriction = checkNested(vac, 'restriction', 'name') ? vac.restriction.name : 'Sem restrição'
    const label = `${assignment} - ${region} - ${restriction}`
    const value = vac['id']
    return { label: label, value: value }
  })
}
