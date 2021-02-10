/** @format */

import { checkNested } from './objectHelpers'

export const convertInscriptionsToOptions = inscriptions => {
  return inscriptions.map(ins => {
    const vacancy = ins.vacancy ? ins.vacancy : null
    const assignment = checkNested(vacancy, 'assignment', 'name') ? vacancy.assignment.name : ''
    const region = checkNested(vacancy, 'region', 'name') ? ` - ${vacancy.region.name}` : ''
    const restriction = checkNested(vacancy, 'restriction', 'name') ? ` - ${vacancy.restriction.name}` : ''

    //construindo objeto.
    const label = `${assignment}${region}${restriction}`
    const value = ins.id

    //retorna
    return { label: label, value: value }
  })
}
