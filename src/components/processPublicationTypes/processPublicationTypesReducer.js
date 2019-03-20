import {
  PROCESSPUBLICATIONTYPES_LOADING,
  GET_PROCESSPUBLICATIONTYPES,
  GET_PROCESSPUBLICATIONTYPE
} from "./processPublicationTypesActionTypes";

const initialState = {
  loading: false,
  processPublicationTypes: null,
  processPublicationType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROCESSPUBLICATIONTYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROCESSPUBLICATIONTYPES:
      return {
        ...state,
        loading: false,
        processPublicationTypes: action.payload
      };
    case GET_PROCESSPUBLICATIONTYPE:
      return {
        ...state,
        loading: false,
        processPublicationType: action.payload
      };
    default:
      return state;
  }
}
