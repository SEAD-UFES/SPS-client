import {
  PROCESSPUBLICATIONS_LOADING,
  GET_PROCESSPUBLICATIONS,
  GET_PROCESSPUBLICATION
} from "./processPublicationTypesActionTypes";

const initialState = {
  loading: false,
  processPublications: null,
  processPublication: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROCESSPUBLICATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROCESSPUBLICATIONS:
      return {
        ...state,
        loading: false,
        processPublications: action.payload
      };
    case GET_PROCESSPUBLICATION:
      return {
        ...state,
        loading: false,
        processPublication: action.payload
      };
    default:
      return state;
  }
}
