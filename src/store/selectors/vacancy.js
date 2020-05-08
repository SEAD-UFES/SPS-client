/** @format */

import { createSelector } from 'reselect'

import { selectAssignment } from './assignment'
import { selectRegion } from './region'
import { selectRestriction } from './restriction'

const selectVacancyStore = store => store.vacancyStoreV2

const selectVacancy = createSelector(
  [selectVacancyStore],
  vs => vs.allIds.map(id => ({ ...vs.byId[id] }))
)

export const makeSelectVacancyById = () => {
  return createSelector(
    [
      selectVacancy,
      selectAssignment,
      selectRegion,
      selectRestriction,
      (store, id, options = {}) => id,
      (store, id, options = {}) => options
    ],
    (vacancies, assignments, regions, restrictions, id, options) => {
      let vacancy = vacancies.find(vacancy => vacancy.id === id)

      if (vacancy && options.withAssignment) {
        const assig = assignments.find(x => x.id === vacancy.assignment_id)
        vacancy = { ...vacancy, assignment: assig ? assig : null }
      }

      if (vacancy && options.withRegion) {
        const reg = regions.find(x => x.id === vacancy.region_id)
        vacancy = { ...vacancy, region: reg ? reg : null }
      }

      if (vacancy && options.withRestriction) {
        const rest = restrictions.find(x => x.id === vacancy.restriction_id)
        vacancy = { ...vacancy, restriction: rest ? rest : null }
      }

      return vacancy
    }
  )
}

export const makeSelectVacancyByCallId = () => {
  return createSelector(
    [
      selectVacancy,
      selectAssignment,
      selectRegion,
      selectRestriction,
      (store, id, options) => id,
      (store, id, options) => options
    ],
    (vacancies, assignments, regions, restrictions, id, options) => {
      let selectedVacancies = vacancies.filter(x => x.call_id === id)

      if (selectedVacancies.length > 0 && options.withAssignment) {
        selectedVacancies = selectedVacancies.map(vac => {
          const assig = assignments.find(x => x.id === vac.assignment_id)
          return { ...vac, assignment: assig ? assig : null }
        })
      }

      if (selectedVacancies.length > 0 && options.withRegion) {
        selectedVacancies = selectedVacancies.map(vac => {
          const reg = regions.find(x => x.id === vac.region_id)
          return { ...vac, region: reg ? reg : null }
        })
      }

      if (selectedVacancies.length > 0 && options.withRestriction) {
        selectedVacancies = selectedVacancies.map(vac => {
          const rest = restrictions.find(x => x.id === vac.restriction_id)
          return { ...vac, restriction: rest ? rest : null }
        })
      }

      return selectedVacancies
    }
  )
}

//single instance of selectVacancyById
export const selectVacancyById = makeSelectVacancyById()

//single instance of selectVacancyByCallId
export const selectVacancyByCallId = makeSelectVacancyByCallId()
