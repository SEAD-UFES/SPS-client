/** @format */

//fathers
import { getProcessById } from './getProcess'

//sons
import { getManyCalendarByCallId } from './getManyCalendarByCallId'
import { getManyVacancyByCallId } from './getManyVacancyByCallId'

export const getCallById = (store, id, options = {}) => {
  console.log('pegando call')
  //find call
  const CallStoreV2 = store.callStoreV2
  const calls = CallStoreV2.allIds.map(id => ({ ...CallStoreV2.byId[id] }))
  const call = calls.find(call => call.id === id)
  const newCall = call ? { ...call } : null

  //get father process
  if (newCall && options.withProcess) {
    const opt_process = typeof options.withProcess === 'object' ? options.withProcess : {}
    newCall.process = getProcessById(store, newCall.selectiveProcess_id, opt_process)
  }

  //get child calendar
  if (newCall && options.withCalendar) {
    const opt_calendar = typeof options.withCalendar === 'object' ? options.withCalendar : {}
    newCall.calendars = getManyCalendarByCallId(store, newCall.id, opt_calendar)
  }

  //get child vacancy
  if (newCall && options.withVacancy) {
    const opt_vacancy = typeof options.withVacancy === 'object' ? options.withVacancy : {}
    newCall.vacancies = getManyVacancyByCallId(store, newCall.id, opt_vacancy)
  }

  return newCall
}
