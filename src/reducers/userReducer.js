import {
  GET_USER,
  GET_USERS,
  GET_USERS_MINIMAL,
  USER_LOADING,
  GET_USER_PEOPLE_OPTIONS
} from "../actions/types";

const initialState = {
  user: null,
  users: null,
  usersMinimal: null,
  loading: false,
  options: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USERS_MINIMAL:
      return {
        ...state,
        usersMinimal: action.payload,
        loading: false
      };
    case GET_USER_PEOPLE_OPTIONS:
      return {
        ...state,
        options: action.payload
      };
    default:
      return state;
  }
}
