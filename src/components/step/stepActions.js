import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_STEP, STEPS_LOADING } from "./stepActionTypes";

//steps loading
export const setStepLoading = () => {
  return {
    type: STEPS_LOADING
  };
};

export const createStep = (stepData, process_id, history) => dispatch => {
  axios
    .post("/v1/steps", stepData)
    .then(res => {
      history.push(`/processes/${process_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getStep = step_id => dispatch => {
  dispatch(setStepLoading());
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

export const updateStep = (process_id, step_id, stepData, history) => dispatch => {
  axios
    .put(`/v1/steps/${step_id}`, stepData)
    .then(res => {
      history.push(`/processes/${process_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteStep = (step_id, callback_ok) => dispatch => {
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
