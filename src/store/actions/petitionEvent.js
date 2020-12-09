/** @format */

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { CREATE_PETITIONEVENT } from '../../store/actionTypes'

//PetitionEvent create
export const createPetitionEvent = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/petitionevents', data)
    .then(res => {
      dispatch({ type: CREATE_PETITIONEVENT, payload: res.data })

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
      payload: { anotherError: true, message: err.message }
    })
  }
}
