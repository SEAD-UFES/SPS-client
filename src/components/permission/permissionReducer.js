import { PERMISSIONS_LOADING, GET_PERMISSIONS, GET_PERMISSION } from "./permissionActionTypes";

const initialState = {
  loading: false,
  permission: null,
  permissions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERMISSIONS:
      return {
        ...state,
        loading: false,
        permissions: action.payload
      };
    case GET_PERMISSION:
      return {
        ...state,
        loading: false,
        permission: action.payload
      };
    default:
      return state;
  }
}
