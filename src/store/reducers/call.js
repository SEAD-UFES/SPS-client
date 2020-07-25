/** @format */

import _ from 'lodash'

import { LOADING_CALL, CREATE_CALL, READ_CALL, UPDATE_CALL, DELETE_CALL, READ_LIST_CALL } from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const sortAllIdsByNumber = byId => (a, b) => {
  console.log()
  if (byId[a].number.toLowerCase() > byId[b].number.toLowerCase()) return -1
  if (byId[a].number.toLowerCase() < byId[b].number.toLowerCase()) return 1
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
    case LOADING_CALL:
      return { ...state, loading: true }
    case CREATE_CALL:
    case READ_CALL:
    case UPDATE_CALL:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByNumber(newState.byId))
      }
    case DELETE_CALL:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByNumber(newState.byId))
      }
    case READ_LIST_CALL:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByNumber(newState.byId))
      }
    default:
      return state
  }
}
