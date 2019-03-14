import {
  PERMISSIONTYPES_LOADING,
  GET_PERMISSIONTYPES,
  GET_PERMISSIONTYPE
} from "./permissionTypesActionTypes";

const initialState = {
  loading: false,
  permissionType: null,
  permissionTypes: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONTYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERMISSIONTYPES:
      return {
        ...state,
        loading: false,
        permissionTypes: action.payload
      };
    case GET_PERMISSIONTYPE:
      return {
        ...state,
        loading: false,
        permissionType: action.payload
      };
    default:
      return state;
  }
}
