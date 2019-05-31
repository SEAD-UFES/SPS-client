import { GRADUATIONTYPES_LOADING, GET_GRADUATIONTYPES, GET_GRADUATIONTYPE } from "./graduationTypeActionTypes";

const initialState = {
  loading: false,
  graduationType: null,
  graduationTypes: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GRADUATIONTYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GRADUATIONTYPES:
      return {
        ...state,
        loading: false,
        graduationTypes: action.payload
      };
    case GET_GRADUATIONTYPE:
      return {
        ...state,
        loading: false,
        graduationType: action.payload
      };
    default:
      return state;
  }
}
