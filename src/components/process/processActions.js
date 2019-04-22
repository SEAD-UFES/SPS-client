import axios from "axios";

import { GET_ERRORS, CLEAR_ERRORS } from "actions/types";
import { GET_PROCESS, GET_PROCESSES, PROCESS_LOADING } from "./processActionTypes";

//Process loading
export const setProcessLoading = () => {
  return {
    type: PROCESS_LOADING
  };
};

//create Process
export const createProcess = (processData, history) => dispatch => {
  axios
    .post("/v1/selectiveprocesses", processData)
    .then(res => {
      history.push(`/processes/${res.data.id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get Process
export const getProcess = (process_id, options = {}) => dispatch => {
  let url = `/v1/selectiveprocesses/${process_id}`;

  if (options.public === true) {
    url = `/v1/selectiveprocesses/${process_id}/public`;
  }

  dispatch(setProcessLoading());
  axios
    .get(`${url}`)
    .then(res =>
      dispatch({
        type: GET_PROCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROCESS,
        payload: null
      })
    );
};

//update Process Data
export const updateProcess = (processId, processData, history) => dispatch => {
  axios
    .put(`/v1/selectiveprocesses/${processId}`, processData)
    .then(res => {
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/processes/${processId}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get Process List
export const getProcessList = (options = {}) => dispatch => {
  let url = "/v1/selectiveprocesses";

  if (!options.page) {
    options.page = 1;
  }

  if (!options.limit) {
    options.limit = 10;
  }

  if (options.public === true) {
    url = "/v1/selectiveprocesses/public";
  }

  dispatch(setProcessLoading());
  axios
    .get(`${url}?page=${options.page}&limit=${options.limit}`)
    .then(res =>
      dispatch({
        type: GET_PROCESSES,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROCESSES,
        payload: null
      });
    });
};
