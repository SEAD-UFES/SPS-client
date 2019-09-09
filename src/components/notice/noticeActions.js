import spsApi from 'apis/spsServer'

import { GET_ERRORS } from 'actions/types'
import { NOTICES_LOADING, READ_NOTICE } from './noticeActionTypes'

//calls loading
export const setNoticesLoading = () => {
  return {
    type: NOTICES_LOADING
  }
}

export const createNotice = (noticeData, callback_ok) => dispatch => {
  dispatch(setNoticesLoading())
  spsApi
    .post('/v1/notices', noticeData)
    .then(res => {
      dispatch({
        type: CREATE_NOTICE,
        payload: res.data
      })
      callback_ok()
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const getNotice = notice_id => dispatch => {
  dispatch(setNoticesLoading())
  spsApi
    .get(`/v1/calls/${notice_id}`)
    .then(res => {
      dispatch({
        type: READ_NOTICE,
        payload: res.data
      })
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const updateNotice = (noticeData, callback_ok) => dispatch => {
  dispatch(setNoticesLoading())
  spsApi
    .put(`/v1/notices/${noticeData.id}`, noticeData)
    .then(res => {
      dispatch({
        type: UPDATE_NOTICE,
        payload: res.data
      })
      callback_ok()
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const deleteNotice = (notice_id, callback_ok) => dispatch => {
  dispatch(setNoticesLoading())
  spsApi
    .delete(`/v1/calls/${notice_id}`)
    .then(res => {
      dispatch({
        type: DELETE_NOTICE,
        payload: notice_id
      })
      callback_ok()
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
