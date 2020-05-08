/** @format */

import _ from 'lodash'
import {
  LOADING_VACANCYV2,
  CREATE_VACANCYV2,
  READ_VACANCYV2,
  READ_LIST_VACANCYV2,
  UPDATE_VACANCYV2
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

const putList = (state, list) => {
  const newById = { ...state.byId, ..._.mapKeys(list, 'id') }
  const newAllIds = Object.keys(newById)
  return { byId: newById, allIds: newAllIds }
}

export default function(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOADING_VACANCYV2:
      return { ...state, loading: true }
    case CREATE_VACANCYV2:
    case READ_VACANCYV2:
    case UPDATE_VACANCYV2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(sortAllIdsByCreatedAt(newState.byId))
      }
    case READ_LIST_VACANCYV2:
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
