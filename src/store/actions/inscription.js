/** @format */

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { LOADING_INSCRIPTION, CREATE_INSCRIPTION } from '../../store/actionTypes'

//Inscription loading
export const setInscriptionLoading = () => {
  return { type: LOADING_INSCRIPTION }
}

//Inscription create
export const createInscription = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/inscriptions', data)
    .then(res => {
      dispatch({ type: CREATE_INSCRIPTION, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
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
