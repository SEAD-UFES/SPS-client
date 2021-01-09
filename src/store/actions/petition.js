/** @format */

import _ from 'lodash'

import {
  GET_ERRORS,
  LOADING_PETITION,
  CREATE_PETITION,
  READ_PETITION,
  DELETE_PETITION,
  READ_LIST_PETITION
} from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import { convertArrayToQueryString } from '../../utils/queryHelpers'
import { readListInscription } from './inscription'

//Petition loading
export const setPetitionLoading = () => {
  return { type: LOADING_PETITION }
}

//Petition create
export const createPetition = (data, options = {}) => (dispatch, getState) => {
  spsApi
    .post('/v1/petitions', data)
    .then(res => {
      dispatch({ type: CREATE_PETITION, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Petition read
export const readPetition = (id, options = {}) => (dispatch, getState) => {
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setPetitionLoading())
  spsApi
    .get(`/v1/petitions/${id}`)
    .then(res => {
      dispatch({ type: READ_PETITION, payload: res.data })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Petition delete
export const deletePetition = (id, options = {}) => (dispatch, getState) => {
  console.log('entrei')
  spsApi
    .delete(`/v1/petitions/${id}`)
    .then(res => {
      console.log('tenho uma resposta')
      dispatch({ type: DELETE_PETITION, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Petition Add List
export const readListPetition = (options = {}) => dispatch => {
  const newOptions = _.omit(options, 'callbackOk')

  let url = `/v1/petitions?`

  //add petitionEvent id options
  if (options.petitionEvent_ids) {
    const pEventIdsString = options.petitionEvent_ids
      ? convertArrayToQueryString('petitionEvent_ids', options.petitionEvent_ids)
      : ''
    url = url + '&' + pEventIdsString
  }

  dispatch(setPetitionLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_PETITION, payload: res.data })

      //get inscription
      if (options.withInscription) {
        const opt_inscription = typeof options.withInscription === 'object' ? options.withInscription : {}
        const inscriptionIds = res.data.map(pet => pet.inscription_id)

        dispatch(readListInscription({ inscription_ids: inscriptionIds, ...opt_inscription }))
      }

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
