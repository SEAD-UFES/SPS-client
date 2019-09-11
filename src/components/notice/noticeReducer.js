import {
  NOTICES_LOADING,
  CREATE_NOTICE,
  READ_NOTICE,
  UPDATE_NOTICE,
  DELETE_NOTICE,
  READ_NOTICES
} from './noticeActionTypes'

const initialState = {
  loading: false,
  notices: []
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
    case NOTICES_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices, action.payload]
      }
    case READ_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldId(action)), action.payload]
      }
    case UPDATE_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldId(action)), action.payload]
      }
    case DELETE_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(value => value.id !== action.payload)]
      }
    case READ_NOTICES:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldIds(action)), ...action.payload]
      }
    default:
      return state
  }
}
