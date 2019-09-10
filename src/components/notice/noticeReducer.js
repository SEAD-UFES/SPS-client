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
        notices: [...state, action.payload]
      }
    case READ_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldId), action.payload]
      }
    case UPDATE_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldId), action.payload]
      }
    case DELETE_NOTICE:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(value => value !== action.payload)]
      }
    case READ_NOTICES:
      return {
        ...state,
        loading: false,
        notices: [...state.notices.filter(filter_removeOldIds), ...action.payload]
      }
    default:
      return state
  }
}
