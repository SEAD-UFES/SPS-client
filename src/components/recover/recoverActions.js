import spsApi from 'apis/spsServer'

import { GET_ERRORS } from 'actions/types'

export const requireRecover = (emailData, callback_ok) => dispatch => {
  spsApi
    .post('/v1/recover', emailData)
    .then(res => {
      callback_ok(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const getRecover = (token, callback_ok) => dispatch => {
  spsApi
    .get(`/v1/recover/${token}`)
    .then(res => {
      callback_ok(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const changeRecover = (token, password, callback_ok) => dispatch => {
  spsApi
    .post(`/v1/recover/${token}`, { password: password })
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
