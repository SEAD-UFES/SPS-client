/** @format */

import _ from 'lodash'
import {
  LOADING_VACANCY,
  CREATE_VACANCY,
  READ_VACANCY,
  UPDATE_VACANCY,
  DELETE_VACANCY,
  READ_LIST_VACANCY
} from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const sortAllIdsByCreatedAt = byId => (a, b) => {
  if (new Date(byId[a].createdAt) > new Date(byId[b].createdAt)) return -1
  if (new Date(byId[a].createdAt) < new Date(byId[b].createdAt)) return 1
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
    case LOADING_VACANCY:
      return { ...state, loading: true }
    case CREATE_VACANCY:
    case READ_VACANCY:
    case UPDATE_VACANCY:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByCreatedAt(newState.byId))
      }
    case DELETE_VACANCY:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByCreatedAt(newState.byId))
      }
    case READ_LIST_VACANCY:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByCreatedAt(newState.byId))
      }
    default:
      return state
  }
}
