import { ASSIGNMENTS_LOADING, GET_ASSIGNMENTS } from "./assignmentActionTypes";

const initialState = {
  loading: false,
  assignments: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        loading: false,
        assignments: action.payload
      };
    default:
      return state;
  }
}
