import { CALLS_LOADING, GET_CALLS, GET_CALL } from "./callActionTypes";

const initialState = {
  loading: false,
  calls: null,
  call: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALLS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CALLS:
      return {
        ...state,
        loading: false,
        calls: action.payload
      };
    case GET_CALL:
      return {
        ...state,
        loading: false,
        call: action.payload
      };
    default:
      return state;
  }
}
