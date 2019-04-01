import { STEPS_LOADING, GET_STEPS, GET_STEP } from "./stepsActionTypes";

const initialState = {
  loading: false,
  steps: null,
  step: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STEPS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STEPS:
      return {
        ...state,
        loading: false,
        steps: action.payload
      };
    case GET_STEP:
      return {
        ...state,
        loading: false,
        step: action.payload
      };
    default:
      return state;
  }
}
