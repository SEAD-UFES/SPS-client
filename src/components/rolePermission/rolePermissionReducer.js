import { ROLEPERMISSIONS_LOADING, GET_ROLEPERMISSIONS, GET_ROLEPERMISSION } from "./rolePermissionActionTypes";

const initialState = {
  loading: false,
  rolePermission: null,
  rolePermissions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROLEPERMISSIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROLEPERMISSIONS:
      return {
        ...state,
        loading: false,
        rolePermissions: action.payload
      };
    case GET_ROLEPERMISSION:
      return {
        ...state,
        loading: false,
        rolePermission: action.payload
      };
    default:
      return state;
  }
}
