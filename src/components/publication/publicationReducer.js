import { PUBLICATIONS_LOADING, GET_PUBLICATIONS, GET_PUBLICATION } from './publicationActionTypes'

const initialState = {
  loading: false,
  publications: null,
  publication: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PUBLICATIONS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PUBLICATIONS:
      return {
        ...state,
        loading: false,
        publications: action.payload
      }
    case GET_PUBLICATION:
      return {
        ...state,
        loading: false,
        publication: action.payload
      }
    default:
      return state
  }
}
