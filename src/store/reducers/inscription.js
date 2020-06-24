/** @format */

import _ from 'lodash'
import moment from 'moment'

import {
  LOADING_INSCRIPTION,
  CREATE_INSCRIPTION,
  READ_INSCRIPTION,
  UPDATE_INSCRIPTION,
  DELETE_INSCRIPTION,
  READ_LIST_INSCRIPTION
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
    case LOADING_INSCRIPTION:
      return { ...state, loading: true }
    case CREATE_INSCRIPTION:
    case READ_INSCRIPTION:
    case UPDATE_INSCRIPTION:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case DELETE_INSCRIPTION:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case READ_LIST_INSCRIPTION:
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
