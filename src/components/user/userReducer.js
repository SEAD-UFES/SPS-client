import { GET_USER, GET_USERS, USERS_LOADING, GET_USER_PEOPLE_OPTIONS, GET_USERS_MINIMAL } from "./userActionTypes";

const initialState = {
  user: null,
  users: null,
  usersMinimal: null,
  loading: false,
  options: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
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
