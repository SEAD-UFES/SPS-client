import { ROLETYPES_LOADING, GET_ROLETYPES, GET_ROLETYPE } from "./roleTypeActionTypes";

const initialState = {
  loading: false,
  roleType: null,
  roleTypes: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROLETYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROLETYPES:
      return {
        ...state,
        loading: false,
        roleTypes: action.payload
      };
    case GET_ROLETYPE:
      return {
        ...state,
        loading: false,
        roleType: action.payload
      };
    default:
      return state;
  }
}
