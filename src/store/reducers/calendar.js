/** @format */

import _ from 'lodash'
import moment from 'moment'

import {
  LOADING_CALENDAR,
  CREATE_CALENDAR,
  READ_CALENDAR,
  UPDATE_CALENDAR,
  DELETE_CALENDAR,
  READ_LIST_CALENDAR
} from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

//Ordenar por start
const compareAllIdsByStart = byId => (a, b) => {
  const itemA = moment(byId[a].start)
  const itemB = moment(byId[b].start)

  if (itemA < itemB) return -1
  if (itemA > itemB) return 1
  return 0
}

//Ordenar por call_id
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
    case LOADING_CALENDAR:
      return { ...state, loading: true }
    case CREATE_CALENDAR:
    case READ_CALENDAR:
    case UPDATE_CALENDAR:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByName(newState.byId)).sort(compareAllIdsByStart(newState.byId))
      }
    case DELETE_CALENDAR:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByName(newState.byId)).sort(compareAllIdsByStart(newState.byId))
      }
    case READ_LIST_CALENDAR:
      newState = putList(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByName(newState.byId)).sort(compareAllIdsByStart(newState.byId))
      }
    default:
      return state
  }
}
