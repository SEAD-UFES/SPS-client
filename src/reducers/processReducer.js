import {
  GET_PROCESS,
  GET_CALL,
  GET_PROCESSES,
  PROCESS_LOADING
} from "../actions/types";

const initialState = {
  process: null,
  call: null,
  processes: null,
  loading: false,
  options: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROCESS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROCESS:
      return {
        ...state,
        process: action.payload,
        loading: false
      };
    case GET_CALL:
      return {
        ...state,
        call: action.payload,
        loading: false
      };
    case GET_PROCESSES:
      return {
        ...state,
        processes: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
