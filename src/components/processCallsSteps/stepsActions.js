import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_STEP, STEPS_LOADING } from "./stepsActionTypes";

export const getProcessCallStep = step_id => dispatch => {
  dispatch(setProcessCallStepsLoading());
  axios
    .get(`/v1/steps/${step_id}`)
    .then(res =>
      dispatch({
        type: GET_STEP,
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

export const deleteProcessCallStep = (step_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/steps/${step_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = {};
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
export const setProcessCallStepsLoading = () => {
  return {
    type: STEPS_LOADING
  };
};
