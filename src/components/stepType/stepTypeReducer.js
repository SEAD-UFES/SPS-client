import { STEPTYPES_LOADING, GET_STEPTYPES, GET_STEPTYPE } from "./stepTypeActionTypes";

const initialState = {
  loading: false,
  stepType: null,
  stepTypes: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STEPTYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STEPTYPES:
      return {
        ...state,
        loading: false,
        stepTypes: action.payload
      };
    case GET_STEPTYPE:
      return {
        ...state,
        loading: false,
        stepType: action.payload
      };
    default:
      return state;
  }
}
