import { USERROLES_LOADING, GET_USERROLES, GET_USERROLE } from "./userRoleActionTypes";

const initialState = {
  loading: false,
  userRoles: null,
  userRole: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERROLES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERROLES:
      return {
        ...state,
        loading: false,
        userRoles: action.payload
      };
    case GET_USERROLE:
      return {
        ...state,
        loading: false,
        userRole: action.payload
      };
    default:
      return state;
  }
}
