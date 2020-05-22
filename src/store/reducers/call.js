/** @format */

import _ from 'lodash'

import { LOADING_CALLV2, READ_CALLV2, UPDATE_CALLV2, DELETE_CALLV2 } from '../actionTypes'

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

export default function(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOADING_CALLV2:
      return { ...state, loading: true }
    case READ_CALLV2:
    case UPDATE_CALLV2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByNumber(newState.byId))
      }
    case DELETE_CALLV2:
      newState = removeItem(state, action.payload)
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
