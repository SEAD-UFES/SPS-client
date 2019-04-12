import { GET_PROFILE, PROFILE_LOADING, CLEAR_PROFILE, GET_PROFILE_OPTIONS } from "./profileActionTypes";

const initialState = {
  loading: false,
  profile: null,
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
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILE_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    default:
      return state;
  }
}
