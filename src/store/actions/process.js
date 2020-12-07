/** @format */

import _ from 'lodash'

import spsApi from '../../apis/spsServer'

import { GET_ERRORS, CLEAR_ERRORS } from '../actionTypes'
import { GET_PROCESS, GET_PROCESSES, PROCESS_LOADING, GET_PROCESS_FILTERS } from '../actionTypes'
import { readListCall } from './call'

//Process loading
export const setProcessLoading = () => {
  return {
    type: PROCESS_LOADING
  }
}

//create Process
export const createProcess = (processData, history) => dispatch => {
  spsApi
    .post('/v1/selectiveprocesses', processData)
    .then(res => {
      history.push(`/processes/read/${res.data.id}`)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//get Process
export const getProcess = (process_id, options = {}) => dispatch => {
  let url = `/v1/selectiveprocesses/${process_id}`
  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      dispatch({ type: GET_PROCESS, payload: res.data })

      const newOptions = _.omit(options, 'callbackOk')

      //get call
      if (options.withCall) {
        dispatch(readListCall({ ...newOptions, selectiveProcess_ids: [res.data.id] }))
      }

      if (options.callbackOk) options.callbackOk(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_PROCESS,
        payload: null
      })
    )
}

//update Process Data
export const updateProcess = (processId, processData, history) => dispatch => {
  spsApi
    .put(`/v1/selectiveprocesses/${processId}`, processData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS })
      history.push(`/processes/read/${processId}`)
    })
    .catch(err => {
      handleErrors(err, dispatch)
    })
}

//get Process List
export const getProcessList = (options = {}) => dispatch => {
  let url = '/v1/selectiveprocesses'

  if (!options.page) {
    options.page = 1
  }
  url = url + `?page=${options.page}`

  //base parameters
  if (!options.limit) {
    options.limit = 10
  }
  url = url + `&limit=${options.limit}`

  if (options.numbers) {
    url = url + `&numbers=${options.numbers}`
  }

  //filters
  if (options.years) {
    url = url + `&years=${options.years}`
  }

  if (options.graduationTypes) {
    url = url + `&graduationTypes=${options.graduationTypes}`
  }

  if (options.courses) {
    url = url + `&courses=${options.courses}`
  }

  if (options.assignments) {
    url = url + `&assignments=${options.assignments}`
  }

  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res =>
      dispatch({
        type: GET_PROCESSES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROCESSES,
        payload: null
      })
    })
}

//get Process Filters
export const getProcessFilters = () => dispatch => {
  let url = '/v1/selectiveprocesses/filters'
  //console.log("getProcessFilters");
  dispatch(setProcessLoading())
  spsApi
    .get(`${url}`)
    .then(res => {
      //Build filters on right format
      const filters = res.data
      let indexes = Object.keys(filters)
      let state_filters = {}

      for (let index of indexes) {
        const filter = filters[index]
        let state_filter = []

        if (filter.length > 0) {
          if (typeof filter[0] !== 'object') {
            state_filter = filter.map(item => {
              return { label: item, value: item, marked: false, applied: false }
            })
          } else {
            state_filter = filter.map(item => {
              return { label: item.name, value: item.id, marked: false, applied: false }
            })
          }
        }

        state_filters[index] = state_filter
      }

      dispatch({
        type: GET_PROCESS_FILTERS,
        payload: state_filters
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const setProcessFilters = new_filters => dispatch => {
  dispatch({
    type: GET_PROCESS_FILTERS,
    payload: new_filters
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
