/** @format */

//import _ from 'lodash'
import { LOADING_REGIONV2, READ_REGIONV2 } from '../actionTypes'

const initialState = {
  loading: false,
  byId: {},
  allIds: []
}

const putItem = (state, payload) => {
  const newById = { ...state.byId, [payload.id]: payload }
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
        allIds: newState.allIds
      }
    default:
      return state
  }
}
