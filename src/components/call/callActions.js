import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import { GET_CALL, CALLS_LOADING } from "./callActionTypes";

//calls loading
export const setCallsLoading = () => {
  return {
    type: CALLS_LOADING
  };
};

export const createCall = (callData, history) => dispatch => {
  spsApi
    .post("/v1/calls", callData)
    .then(res => {
      history.push(`/processes/${callData.selectiveProcess_id}`);
    })
    .catch(err => {
      handleErrors(err, dispatch);
    });
};

export const getCall = call_id => dispatch => {
  dispatch(setCallsLoading());
  spsApi
    .get(`/v1/calls/${call_id}`)
    .then(res =>
      dispatch({
        type: GET_CALL,
        payload: res.data
      })
    )
    .catch(err => {
      handleErrors(err, dispatch);
    });
};

export const updateCall = (callId, callData, history) => dispatch => {
  spsApi
    .put(`/v1/calls/${callId}`, callData)
    .then(res => {
      history.push(`/processes/${callData.selectiveProcess_id}`);
    })
    .catch(err => {
      handleErrors(err, dispatch);
    });
};

export const deleteCall = (call_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/calls/${call_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      handleErrors(err, dispatch);
    });
};

const handleErrors = (err, dispatch) => {
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
};
