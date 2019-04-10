import { PUBLICATIONS_LOADING, GET_PUBLICATIONS, GET_PUBLICATION } from "./publicationActionTypes";

const initialState = {
  loading: false,
  processPublications: null,
  processPublication: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUBLICATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PUBLICATIONS:
      return {
        ...state,
        loading: false,
        processPublications: action.payload
      };
    case GET_PUBLICATION:
      return {
        ...state,
        loading: false,
        processPublication: action.payload
      };
    default:
      return state;
  }
}
