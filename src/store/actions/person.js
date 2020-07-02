/** @format */

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { LOADING_PERSON, READ_PERSON, READ_LIST_PERSON } from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//Person loading
export const setPersonLoading = () => {
  return { type: LOADING_PERSON }
}

//Person read
export const readPerson = (id, options = {}) => (dispatch, getState) => {
  dispatch(setPersonLoading())
  spsApi
    .get(`/v1/people/${id}`)
    .then(res => {
      dispatch({ type: READ_PERSON, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Person Add List
export const readListPerson = (options = {}) => dispatch => {
  let url = `/v1/people`
  const personIdsString = options.person_ids
    ? convertArrayToQueryString('person_ids', options.inscriptionEvent_ids)
    : ''
  url = `${url}?${personIdsString}`

  dispatch(setPersonLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_PERSON, payload: res.data })

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
      payload: { anotherError: true, message: err.message }
    })
  }
}
