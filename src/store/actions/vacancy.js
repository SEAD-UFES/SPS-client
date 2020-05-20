/** @format */
import _ from 'lodash'

import { GET_ERRORS } from '../../store/actionTypes'
import {
  LOADING_VACANCYV2,
  CREATE_VACANCYV2,
  READ_VACANCYV2,
  UPDATE_VACANCYV2,
  DELETE_VACANCYV2,
  READ_LIST_VACANCYV2
} from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { readAssignmentV2 } from './assignment'
import { readRegionV2 } from './region'
import { readRestrictionV2 } from './restriction'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//Vacancy loading
export const setVacancyLoadingV2 = () => {
  return { type: LOADING_VACANCYV2 }
}

//Vacancy create
export const createVacancy = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/vacancies', data)
    .then(res => {
      dispatch({ type: CREATE_VACANCYV2, payload: res.data })
      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Vacancy read
export const readVacancyV2 = (id, options = {}) => (dispatch, getState) => {
  dispatch(setVacancyLoadingV2())
  spsApi
    .get(`/v1/vacancies/${id}`)
    .then(res => {
      dispatch({ type: READ_VACANCYV2, payload: res.data })
      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Vacancy update
export const updateVacancy = (id, data, options = {}) => (dispatch, getState) => {
  spsApi
    .put(`/v1/vacancies/${id}`, data)
    .then(res => {
      dispatch({ type: UPDATE_VACANCYV2, payload: res.data })
      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Vacancy update
export const deleteVacancy = (id, options = {}) => (dispatch, getState) => {
  spsApi
    .delete(`/v1/vacancies/${id}`)
    .then(res => {
      dispatch({ type: DELETE_VACANCYV2, payload: id })
      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Vacancy Add List
export const readListVacancyV2 = (options = {}) => dispatch => {
  let url = `/v1/vacancies`
  const callIdsString = options.call_ids ? convertArrayToQueryString('call_ids', options.call_ids) : ''
  url = `${url}?${callIdsString}`

  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_VACANCYV2, payload: res.data })
      const newOptions = _.omit(options, 'callbackOk')

      if (options.withAssignment) {
        const assigIds = [...new Set(res.data.map(vac => vac.assignment_id))]
        assigIds.map(id => {
          return dispatch(readAssignmentV2(id, newOptions))
        })
      }

      if (options.withRegion) {
        const regionIds = [...new Set(res.data.map(vac => vac.region_id))].filter(id => id !== null)
        regionIds.map(id => {
          return dispatch(readRegionV2(id, newOptions))
        })
      }

      if (options.withRestriction) {
        const restrictionIds = [...new Set(res.data.map(vac => vac.restriction_id))].filter(id => id !== null)
        restrictionIds.map(id => {
          return dispatch(readRestrictionV2(id, newOptions))
        })
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Function to handle errors
const handleErrors = (err, dispatch) => {
  if (err.response) {
    let errors = {}
    errors.data = err.response.data
    errors.serverError = true
    dispatch({
      type: GET_ERRORS,
      payload: errors
    })
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: { anotherError: true }
    })
  }
}
