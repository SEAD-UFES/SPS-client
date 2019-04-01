import { VACANCIES_LOADING, GET_VACANCIES, GET_VACANCY } from "./vacanciesActionTypes";

const initialState = {
  loading: false,
  vacancies: null,
  vacancy: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VACANCIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VACANCIES:
      return {
        ...state,
        loading: false,
        vacancies: action.payload
      };
    case GET_VACANCY:
      return {
        ...state,
        loading: false,
        vacancy: action.payload
      };
    default:
      return state;
  }
}
