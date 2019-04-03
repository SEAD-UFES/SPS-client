import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_CALL, CALLS_LOADING } from "./callsActionTypes";

export const getProcessCall = call_id => dispatch => {
  dispatch(setProcessCallsLoading());
  axios
    .get(`/v1/calls/${call_id}`)
    .then(res =>
      dispatch({
        type: GET_CALL,
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

export const deleteProcessCall = (call_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/calls/${call_id}`)
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

//calls loading
export const setProcessCallsLoading = () => {
  return {
    type: CALLS_LOADING
  };
};
