import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_VACANCY, VACANCIES_LOADING } from "./vacanciesActionTypes";

export const getProcessCallVacancy = vacancy_id => dispatch => {
  dispatch(setProcessCallVacanciesLoading());
  axios
    .get(`/v1/vacancies/${vacancy_id}`)
    .then(res =>
      dispatch({
        type: GET_VACANCY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteProcessCallVacancy = (vacancy_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/vacancies/${vacancy_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors;
        errors.data = err.response.data;
        errors.serverError = true;
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { anotherError: true }
        });
      }
    });
};

//roleAssignments loading
export const setProcessCallVacanciesLoading = () => {
  return {
    type: VACANCIES_LOADING
  };
};
