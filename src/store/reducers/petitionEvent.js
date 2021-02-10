/** @format */

import _ from 'lodash'
import moment from 'moment'

import {
  LOADING_PETITIONEVENT,
  CREATE_PETITIONEVENT,
  READ_PETITIONEVENT,
  UPDATE_PETITIONEVENT,
  DELETE_PETITIONEVENT,
  READ_LIST_PETITIONEVENT
} from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const compareAllIdsByCreatedAt = byId => (a, b) => {
  const itemA = moment(byId[a].createdAt)
  const itemB = moment(byId[b].createdAt)

  if (itemA < itemB) return -1
  if (itemA > itemB) return 1
  return 0
}

const putItem = (state, payload) => {
  const newById = { ...state.byId, [payload.id]: payload }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

const removeItem = (state, id) => {
  const newById = _.omit(state.byId, id)
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

const putList = (state, list) => {
  const newById = { ...state.byId, ..._.mapKeys(list, 'id') }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

export default function(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOADING_PETITIONEVENT:
      return { ...state, loading: true }
    case CREATE_PETITIONEVENT:
    case READ_PETITIONEVENT:
    case UPDATE_PETITIONEVENT:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case DELETE_PETITIONEVENT:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case READ_LIST_PETITIONEVENT:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    default:
      return state
  }
}
