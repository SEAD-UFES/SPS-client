import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PEOPLE_OPTIONS
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false,
  options: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PEOPLE_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    default:
      return state;
  }
}
