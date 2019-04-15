import { STEPTYPES_LOADING, GET_STEPTYPES, GET_STEPTYPE } from "./stepTypeActionTypes";

const initialState = {
  loading: false,
  roleType: null,
  roleTypes: null
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
        roleTypes: action.payload
      };
    case GET_STEPTYPE:
      return {
        ...state,
        loading: false,
        roleType: action.payload
      };
    default:
      return state;
  }
}
