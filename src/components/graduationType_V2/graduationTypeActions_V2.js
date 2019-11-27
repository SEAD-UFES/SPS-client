import spsApi from 'apis/spsServer'

import { GET_ERRORS } from 'actions/types'

import {
  LOADING_GRADUATIONTYPES_V2,
  CREATE_GRADUATIONTYPE_V2,
  READ_GRADUATIONTYPE_V2,
  UPDATE_GRADUATIONTYPE_V2,
  DELETE_GRADUATIONTYPE_V2,
  LIST_GRADUATIONTYPE_V2
} from './graduationTypeActionTypes_V2'

//roleTypes loading
export const setGraduationTypesLoading = () => {
  return {
    type: LOADING_GRADUATIONTYPES_V2
  }
}

export const createGraduationType = (graduationTypeData, callback_ok) => dispatch => {
  spsApi
    .post('/v1/graduationtypes', graduationTypeData)
    .then(res => {
      dispatch({
        type: CREATE_GRADUATIONTYPE_V2,
        payload: res.data
      })
      callback_ok(res.data.id)
    })
    .catch(err => {
      handleErrors(err, dispatch, 'createGraduationType')
    })
}

export const getGraduationType = graduationType_id => dispatch => {
  spsApi
    .get(`/v1/graduationtypes/${graduationType_id}`)
    .then(res =>
      dispatch({
        type: READ_GRADUATIONTYPE_V2,
        payload: res.data
      })
    )
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

export const updateGraduationType = (graduationTypeData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/graduationtypes/${graduationTypeData.id}`, graduationTypeData)
    .then(res => {
      dispatch({
        type: UPDATE_GRADUATIONTYPE_V2,
        payload: res.data
      })
      callback_ok(graduationTypeData)
    })
    .catch(err => {
      handleErrors(err, dispatch, 'updateGraduationType')
    })
}

export const deleteGraduationType = (graduationType_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/graduationtypes/${graduationType_id}`)
    .then(res => {
      dispatch({
        type: DELETE_GRADUATIONTYPE_V2,
        payload: graduationType_id
      })
      callback_ok()
    })
    .catch(err => {
      handleErrors(err, dispatch, 'deleteGraduationType')
    })
}

export const listGraduationType = () => dispatch => {
  dispatch(setGraduationTypesLoading())
  spsApi
    .get('/v1/graduationtypes')
    .then(res =>
      dispatch({
        type: LIST_GRADUATIONTYPE_V2,
        payload: res.data
      })
    )
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

const handleErrors = (err, dispatch, source) => {
  if (err.response) {
    let errors = {}
    if (source) {
      errors.source = source
    }
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
