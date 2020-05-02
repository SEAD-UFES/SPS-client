/** @format */
import { GET_ERRORS } from '../../store/actionTypes'
import { LOADING_REGIONV2, READ_REGIONV2 } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'

//Region loading
export const setRegionLoadingV2 = () => {
  return { type: LOADING_REGIONV2 }
}

//Region read
export const readRegionV2 = (id, options = {}) => (dispatch, getState) => {
  dispatch(setRegionLoadingV2())
  spsApi
    .get(`/v1/regions/${id}`)
    .then(res => {
      dispatch({ type: READ_REGIONV2, payload: res.data })

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
