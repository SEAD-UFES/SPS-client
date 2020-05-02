/** @format */
import { GET_ERRORS } from '../../store/actionTypes'
import { LOADING_ASSIGNMENTV2, READ_ASSIGNMENTV2 } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'

//Assignment loading
export const setAssignmentLoadingV2 = () => {
  return { type: LOADING_ASSIGNMENTV2 }
}

//Assignment read
export const readAssignmentV2 = (id, options = {}) => (dispatch, getState) => {
  dispatch(setAssignmentLoadingV2())
  spsApi
    .get(`/v1/assignments/${id}`)
    .then(res => {
      dispatch({ type: READ_ASSIGNMENTV2, payload: res.data })

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
