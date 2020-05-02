/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../actionTypes'
import { LOADING_CALLV2, READ_CALLV2 } from '../actionTypes'
import spsApi from '../../apis/spsServer'
import { readListVacancyV2 } from './vacancy'

//Call loading
export const setCallLoadingV2 = () => {
  return { type: LOADING_CALLV2 }
}

//Call read
export const readCallV2 = (id, options = {}) => (dispatch, getState) => {
  dispatch(setCallLoadingV2())
  spsApi
    .get(`/v1/calls/${id}`)
    .then(res => {
      dispatch({ type: READ_CALLV2, payload: res.data })
      const newOptions = _.omit(options, 'callbackOk')

      //get vacancies if need
      if (options.withVacancy) {
        dispatch(readListVacancyV2({ ...newOptions, call_ids: [res.data.id] }))
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
