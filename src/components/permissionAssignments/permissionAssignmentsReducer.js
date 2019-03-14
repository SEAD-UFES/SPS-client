import {
  PERMISSIONASSIGNMENTS_LOADING,
  GET_PERMISSIONASSIGNMENTS,
  GET_PERMISSIONASSIGNMENT
} from "./permissionAssignmentsActionTypes";

const initialState = {
  loading: false,
  permissionAssignment: null,
  permissionAssignments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERMISSIONASSIGNMENTS:
      return {
        ...state,
        loading: false,
        permissionAssignments: action.payload
      };
    case GET_PERMISSIONASSIGNMENT:
      return {
        ...state,
        loading: false,
        permissionAssignment: action.payload
      };
    default:
      return state;
  }
}
