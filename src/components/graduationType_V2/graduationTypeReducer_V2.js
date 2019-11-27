import {
  LOADING_GRADUATIONTYPES_V2,
  CREATE_GRADUATIONTYPE_V2,
  READ_GRADUATIONTYPE_V2,
  UPDATE_GRADUATIONTYPE_V2,
  DELETE_GRADUATIONTYPE_V2,
  LIST_GRADUATIONTYPE_V2
} from './graduationTypeActionTypes_V2'

const initialState = {
  loading: false,
  graduationTypes: []
}

export default function(state = initialState, action) {
  const filter_removeOldIds = action => value => {
    const ids = action.payload.map(x => x.id)
    return !ids.includes(value.id)
  }

  const filter_removeOldId = action => value => {
    const ids = [action.payload].map(x => x.id)
    return !ids.includes(value.id)
  }

  switch (action.type) {
    case LOADING_GRADUATIONTYPES_V2:
      return {
        ...state,
        loading: true
      }
    case CREATE_GRADUATIONTYPE_V2:
      return {
        ...state,
        loading: false,
        graduationTypes: [...state.graduationTypes, action.payload]
      }
    case READ_GRADUATIONTYPE_V2:
      return {
        ...state,
        loading: false,
        graduationTypes: [...state.graduationTypes.filter(filter_removeOldId(action)), action.payload]
      }
    case UPDATE_GRADUATIONTYPE_V2:
      return {
        ...state,
        loading: false,
        gaduationTypes: [...state.graduationTypes.filter(filter_removeOldId(action)), action.payload]
      }
    case DELETE_GRADUATIONTYPE_V2:
      return {
        ...state,
        loading: false,
        gaduationTypes: [...state.graduationTypes.filter(value => value.id !== action.payload)]
      }
    case LIST_GRADUATIONTYPE_V2:
      return {
        ...state,
        loading: false,
        graduationTypes: [...state.graduationTypes.filter(filter_removeOldIds(action)), ...action.payload]
      }
    default:
      return state
  }
}
