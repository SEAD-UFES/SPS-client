import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_CALL, CALLS_LOADING } from "./callActionTypes";

//calls loading
export const setCallsLoading = () => {
  return {
    type: CALLS_LOADING
  };
};

export const getCall = call_id => dispatch => {
  dispatch(setCallsLoading());
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

export const deleteCall = (call_id, callback_ok) => dispatch => {
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
