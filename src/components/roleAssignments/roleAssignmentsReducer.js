import {
  ROLEASSIGNMENTS_LOADING,
  GET_ROLEASSIGNMENTS,
  GET_ROLEASSIGNMENT
} from "./roleAssignmentsActionTypes";

const initialState = {
  loading: false,
  roleAssignments: null,
  roleAssignment: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROLEASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROLEASSIGNMENTS:
      return {
        ...state,
        loading: false,
        roleAssignments: action.payload
      };
    case GET_ROLEASSIGNMENT:
      return {
        ...state,
        loading: false,
        roleAssignment: action.payload
      };
    default:
      return state;
  }
}
