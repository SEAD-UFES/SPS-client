import axios from "axios";

import {
  GET_ERRORS,
  GET_PROCESS,
  GET_CALL,
  GET_PROCESSES,
  PROCESS_LOADING,
  CLEAR_ERRORS,
  GET_STEPTYPES_OPTIONS
} from "./types";

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
export const getProcess = process_id => dispatch => {
  dispatch(setProcessLoading());
  axios
    .get(`/v1/selectiveprocesses/${process_id}`)
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

//get Process List
export const getProcessList = (page = 1, limit = 10) => dispatch => {
  dispatch(setProcessLoading());
  axios
    .get(`/v1/selectiveprocesses?page=${page}&limit=${limit}`)
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

//#####################################################################
//Call actions

//create ProcessCall
export const createProcessCall = (callData, history) => dispatch => {
  axios
    .post("/v1/calls", callData)
    .then(res => {
      history.push(`/processes/${callData.selectiveProcess_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get ProcessCall
export const getProcessCall = call_id => dispatch => {
  axios
    .get(`/v1/calls/${call_id}`)
    .then(res => {
      dispatch({
        type: GET_CALL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//update ProcessCall
export const updateProcessCall = (callId, callData, history) => dispatch => {
  axios
    .put(`/v1/calls/${callId}`, callData)
    .then(res => {
      history.push(`/processes/${callData.selectiveProcess_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//#####################################################################

//#####################################################################
//Step actions

//load step options
export const getStepOptions = () => dispatch => {
  axios
    .get("/v1/steptypes")
    .then(res =>
      dispatch({
        type: GET_STEPTYPES_OPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { options: "Don't load the steptypes options" }
      })
    );
};

//#####################################################################

//User loading
export const setProcessLoading = () => {
  return {
    type: PROCESS_LOADING
  };
};

//Update user person options
// export const getUserPeopleOptions = () => dispatch => {
//   axios
//     .get("/v1/people/options")
//     .then(res =>
//       dispatch({
//         type: GET_USER_PEOPLE_OPTIONS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: { options: "Don't load the people options" }
//       })
//     );
// };
