import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import { GET_VACANCY, VACANCIES_LOADING } from "./vacancyActionTypes";

//vacancies loading
export const setVacanciesLoading = () => {
  return {
    type: VACANCIES_LOADING
  };
};

export const createVacancy = (vacancyData, callback_ok) => dispatch => {
  spsApi
    .post("/v1/vacancies", vacancyData)
    .then(res => {
      callback_ok();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getVacancy = vacancy_id => dispatch => {
  dispatch(setVacanciesLoading());
  spsApi
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

export const updateVacancy = (vacancy_id, vacancyData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/vacancies/${vacancy_id}`, vacancyData)
    .then(res => {
      callback_ok();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteVacancy = (vacancy_id, callback_ok) => dispatch => {
  spsApi
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
