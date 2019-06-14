import { PROCESS_LOADING, GET_PROCESS, GET_PROCESSES, GET_PROCESS_FILTERS } from "./processActionTypes";

const initialState = {
  loading: false,
  processes: null,
  process: null,
  filters: []
};

export default function (state = initialState, action) {
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
    case GET_PROCESSES:
      return {
        ...state,
        processes: action.payload,
        loading: false
      };
    case GET_PROCESS_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
}
