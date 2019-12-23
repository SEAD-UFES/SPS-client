import spsApi from 'apis/spsServer'

import { GET_ERRORS } from 'actions/types'

export const verifyToken = (token, callback_ok) => dispatch => {
  spsApi
    .get(`/v1/verifiy/${token}`)
    .then(res => {
      callback_ok(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

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
