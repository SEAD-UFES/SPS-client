import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_STEPTYPE, GET_STEPTYPES, STEPTYPES_LOADING } from "./stepTypeActionTypes";

//roleTypes loading
export const setStepTypesLoading = () => {
  return {
    type: STEPTYPES_LOADING
  };
};

export const createStepType = (stepTypeData, callback_ok) => dispatch => {
  axios
    .post("/v1/steptypes", stepTypeData)
    .then(res => {
      callback_ok(res.data.id);
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

export const getStepType = roleType_id => dispatch => {
  dispatch(setStepTypesLoading());
  axios
    .get(`/v1/steptypes/${roleType_id}`)
    .then(res =>
      dispatch({
        type: GET_STEPTYPE,
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

export const updateStepType = (stepTypeData, callback_ok) => dispatch => {
  axios
    .put(`/v1/steptypes/${stepTypeData.id}`, stepTypeData)
    .then(res => {
      callback_ok(stepTypeData.id);
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

export const deleteStepType = (roleType_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/steptypes/${roleType_id}`)
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

export const getStepTypes = () => dispatch => {
  dispatch(setStepTypesLoading());
  axios
    .get("/v1/steptypes")
    .then(res =>
      dispatch({
        type: GET_STEPTYPES,
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
