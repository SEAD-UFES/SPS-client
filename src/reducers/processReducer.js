import {
  GET_PROCESS,
  GET_CALL,
  GET_PROCESSES,
  PROCESS_LOADING,
  GET_STEPTYPES_OPTIONS,
  GET_STEP,
  GET_ASSIGNMENTS_OPTIONS,
  GET_RESTRICTIONS_OPTIONS,
  GET_REGIONS_OPTIONS
} from "../actions/types";

const initialState = {
  process: null,
  call: null,
  step: null,
  processes: null,
  loading: false,
  options: null,
  assignments: null,
  restrictions: null,
  regions: null
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
    case GET_STEP:
      return {
        ...state,
        step: action.payload,
        loading: false
      };
    case GET_PROCESSES:
      return {
        ...state,
        processes: action.payload,
        loading: false
      };
    case GET_STEPTYPES_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    case GET_ASSIGNMENTS_OPTIONS:
      return {
        ...state,
        assignments: action.payload
      };
    case GET_RESTRICTIONS_OPTIONS:
      return {
        ...state,
        restrictions: action.payload
      };
    case GET_REGIONS_OPTIONS:
      return {
        ...state,
        regions: action.payload
      };

    default:
      return state;
  }
}
