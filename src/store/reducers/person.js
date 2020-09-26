/** @format */

import _ from 'lodash'
import moment from 'moment'

import {
  LOADING_PERSON,
  CREATE_PERSON,
  READ_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  READ_LIST_PERSON
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
    case LOADING_PERSON:
      return { ...state, loading: true }
    case CREATE_PERSON:
    case READ_PERSON:
    case UPDATE_PERSON:
      newState = putItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case DELETE_PERSON:
      newState = removeItem(state, action.payload)
      return {
        ...state,
        loading: false,
        byId: newState.byId,
        allIds: newState.allIds.sort(compareAllIdsByCreatedAt)
      }
    case READ_LIST_PERSON:
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
