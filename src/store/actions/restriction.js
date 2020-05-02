/** @format */
import { GET_ERRORS } from '../../store/actionTypes'
import { LOADING_RESTRICTIONV2, READ_RESTRICTIONV2 } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'

//Restriction loading
export const setRestrictionLoadingV2 = () => {
  return { type: LOADING_RESTRICTIONV2 }
}

//Restriction read
export const readRestrictionV2 = (id, options = {}) => (dispatch, getState) => {
  dispatch(setRestrictionLoadingV2())
  spsApi
    .get(`/v1/restrictions/${id}`)
    .then(res => {
      dispatch({ type: READ_RESTRICTIONV2, payload: res.data })

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
