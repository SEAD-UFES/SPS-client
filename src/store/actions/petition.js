/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { LOADING_PETITION, READ_LIST_PETITION } from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//Petition loading
export const setPetitionLoading = () => {
  return { type: LOADING_PETITION }
}

//Petition Add List
export const readListPetition = (options = {}) => dispatch => {
  const newOptions = _.omit(options, 'callbackOk')
  let url = `/v1/petitions`
  const pEventIdsString = options.petitionEvent_ids
    ? convertArrayToQueryString('petitionEvent_ids', options.petitionEvent_ids)
    : ''
  url = `${url}?${pEventIdsString}`

  dispatch(setPetitionLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_PETITION, payload: res.data })

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
