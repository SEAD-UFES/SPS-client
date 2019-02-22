import {
  RESTRICTIONS_LOADING,
  GET_RESTRICTIONS
} from "./restrictionsActionTypes";

const initialState = {
  loading: false,
  restrictions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESTRICTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RESTRICTIONS:
      return {
        ...state,
        loading: false,
        restrictions: action.payload
      };
    default:
      return state;
  }
}
