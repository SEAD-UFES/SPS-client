import { COURSES_LOADING, GET_COURSES } from "./coursesActionTypes";

const initialState = {
  loading: false,
  courses: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COURSES:
      return {
        ...state,
        loading: false,
        courses: action.payload
      };
    default:
      return state;
  }
}
