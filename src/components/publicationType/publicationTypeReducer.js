import { PUBLICATIONTYPES_LOADING, GET_PUBLICATIONTYPES, GET_PUBLICATIONTYPE } from "./publicationTypeActionTypes";

const initialState = {
  loading: false,
  publicationTypes: null,
  publicationType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUBLICATIONTYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PUBLICATIONTYPES:
      return {
        ...state,
        loading: false,
        publicationTypes: action.payload
      };
    case GET_PUBLICATIONTYPE:
      return {
        ...state,
        loading: false,
        publicationType: action.payload
      };
    default:
      return state;
  }
}
