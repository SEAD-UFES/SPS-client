import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_GRADUATIONTYPE, GET_GRADUATIONTYPES, GRADUATIONTYPES_LOADING } from "./graduationTypeActionTypes";

//roleTypes loading
export const setGraduationTypesLoading = () => {
  return {
    type: GRADUATIONTYPES_LOADING
  };
};

export const createGraduationType = (graduationTypeData, callback_ok) => dispatch => {
  axios
    .post("/v1/graduationtypes", graduationTypeData)
    .then(res => {
      callback_ok(res.data.id);
    })
    .catch(err => {
      if (err.response) {
        let errors = {};
        errors.serverError = true;
        errors.data = err.response.data;
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

export const getGraduationType = graduationType_id => dispatch => {
  dispatch(setGraduationTypesLoading());
  axios
    .get(`/v1/graduationtypes/${graduationType_id}`)
    .then(res =>
      dispatch({
        type: GET_GRADUATIONTYPE,
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

export const updateGraduationType = (graduationTypeData, callback_ok) => dispatch => {
  axios
    .put(`/v1/graduationtypes/${graduationTypeData.id}`, graduationTypeData)
    .then(res => {
      callback_ok(graduationTypeData.id);
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
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

export const deleteGraduationType = (graduationType_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/graduationtypes/${graduationType_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
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

export const getGraduationTypes = () => dispatch => {
  dispatch(setGraduationTypesLoading());
  axios
    .get("/v1/graduationtypes")
    .then(res =>
      dispatch({
        type: GET_GRADUATIONTYPES,
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
