/** @format */

import {
  GET_ERRORS,
  LOADING_PETITIONREPLY,
  CREATE_PETITIONREPLY,
  READ_PETITIONREPLY,
  READ_LIST_PETITIONREPLY
} from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { convertArrayToQueryString } from '../../utils/queryHelpers'

//PetitionReply loading
export const setPetitionReplyLoading = () => {
  return { type: LOADING_PETITIONREPLY }
}

//PetitionReply create
export const createPetitionReply = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/petitionreplies', data)
    .then(res => {
      dispatch({ type: CREATE_PETITIONREPLY, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//PetitionReply read
export const readPetitionReply = (id, options = {}) => (dispatch, getState) => {
  dispatch(setPetitionReplyLoading())
  spsApi
    .get(`/v1/petitionreplies/${id}`)
    .then(res => {
      dispatch({ type: READ_PETITIONREPLY, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Petition Add List
export const readListPetitionReply = (options = {}) => dispatch => {
  let url = `/v1/petitionreplies?`

  //add petitionEvent id options
  if (options.petition_ids && options.petition_ids.length > 0) {
    const petitionIdsString = options.petition_ids
      ? convertArrayToQueryString('petition_ids', options.petition_ids)
      : ''
    url = url + '&' + petitionIdsString
  }

  //start the request
  dispatch(setPetitionReplyLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_PETITIONREPLY, payload: res.data })

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
