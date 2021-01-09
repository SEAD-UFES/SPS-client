/** @format */

import _ from 'lodash'

import { GET_ERRORS } from '../../store/actionTypes'
import spsApi from '../../apis/spsServer'
import {
  LOADING_INSCRIPTION,
  CREATE_INSCRIPTION,
  READ_INSCRIPTION,
  DELETE_INSCRIPTION,
  READ_LIST_INSCRIPTION
} from '../../store/actionTypes'
import { convertArrayToQueryString } from '../../utils/queryHelpers'
import { readVacancy } from './vacancy'
import { readPerson } from './person'

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

//Inscription read
export const readInscription = (id, options = {}) => (dispatch, getState) => {
  const newOptions = _.omit(options, 'callbackOk')

  dispatch(setInscriptionLoading())
  spsApi
    .get(`/v1/inscriptions/${id}`)
    .then(res => {
      dispatch({ type: READ_INSCRIPTION, payload: res.data })

      //include vacancy if needed
      if (options.withVacancy) {
        const vacancy_id = res.data.vacancy_id
        dispatch(readVacancy(vacancy_id, newOptions))
      }

      //include person if needed
      if (options.withPerson) {
        const person_id = res.data.person_id
        dispatch(readPerson(person_id, newOptions))
      }

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => handleErrors(err, dispatch))
}

//Inscription delete
export const deleteInscription = (id, options = {}) => (dispatch, getState) => {
  spsApi
    .delete(`/v1/inscriptions/${id}`, { data: options.body })
    .then(res => {
      dispatch({ type: DELETE_INSCRIPTION, payload: id })

      //run callBack
      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//Inscription Add List
export const readListInscription = (options = {}) => dispatch => {
  const newOptions = _.omit(options, 'callbackOk')

  let url = `/v1/inscriptions?`

  //add inscriptionEvent_ids option
  if (options.inscriptionEvent_ids) {
    const iEventIdsString = options.inscriptionEvent_ids
      ? convertArrayToQueryString('inscriptionEvent_ids', options.inscriptionEvent_ids)
      : ''
    url = `${url}&${iEventIdsString}`
  }

  //add inscription_ids option
  if (options.inscription_ids) {
    const inscriptionIdsString = options.inscription_ids
      ? convertArrayToQueryString('inscription_ids', options.inscription_ids)
      : ''

    if (!inscriptionIdsString) url = `${url}&inscription_ids[]=null`
    else url = `${url}&${inscriptionIdsString}`
  }

  //add ownerOnly option
  if (options.ownerOnly) {
    const ownerOnly = options.ownerOnly ? options.ownerOnly : false
    const ownerOnlyString = ownerOnly ? 'ownerOnly=true' : ''
    url = `${url}&${ownerOnlyString}`
  }

  dispatch(setInscriptionLoading())
  spsApi
    .get(url)
    .then(res => {
      dispatch({ type: READ_LIST_INSCRIPTION, payload: res.data })

      //include vacancy if needed
      if (options.withVacancy) {
        const opt_vac =
          typeof options.withVacancy === 'object' ? { ...newOptions, ...options.withVacancy } : { ...newOptions }
        const vacancyIds = [...new Set(res.data.map(ins => ins.vacancy_id))]
        vacancyIds.map(id => {
          return dispatch(readVacancy(id, opt_vac))
        })
      }

      //include person if needed
      if (options.withPerson) {
        const personIds = [...new Set(res.data.map(ins => ins.person_id))]
        personIds.map(id => {
          return dispatch(readPerson(id, newOptions))
        })
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
