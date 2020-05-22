/** @format */

export const removePotentialCircRef = (calendar, calendars) => {
  let potencialCircRefIds = calendar ? [calendar.id] : []
  let idsToTest = calendar ? [calendar.id] : []

  //determinar candidatos a referencia circular.
  while (idsToTest.length > 0) {
    const potencialFatherId = idsToTest.shift()
    const sonIds = calendars.filter(cld => cld.calendar_id === potencialFatherId).map(cld => cld.id)
    idsToTest = idsToTest.concat(sonIds)
    potencialCircRefIds = potencialCircRefIds.concat(sonIds)
  }

  const newCalendars = calendars.filter(cld => !potencialCircRefIds.includes(cld.id))
  return newCalendars
}
