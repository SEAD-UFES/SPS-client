/** @format */

import _ from 'lodash'
import { LOADING_REGIONV2, READ_REGIONV2, READ_LIST_REGIONV2 } from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const compareAllIdsByName = byId => (a, b) => {
  const itemA = byId[a].name.toLowerCase()
  const itemB = byId[b].name.toLowerCase()

  if (itemA < itemB) return -1
  if (itemA > itemB) return 1
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
    case LOADING_REGIONV2:
      return { ...state, loading: true }
    case READ_REGIONV2:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByName(newState.byId))
      }
    case READ_LIST_REGIONV2:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByName(newState.byId))
      }
    default:
      return state
  }
}
