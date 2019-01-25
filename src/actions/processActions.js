import axios from "axios";

import {
  GET_ERRORS,
  GET_PROCESS,
  GET_CALL,
  GET_PROCESSES,
  PROCESS_LOADING,
  CLEAR_ERRORS
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
      console.log("updated");
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

//Update Person Data
// export const updatePerson = (userId, personData, history) => dispatch => {
//   axios
//     .put(`/v1/people/${userId}`, personData, history)
//     .then(res => {
//       dispatch({ type: CLEAR_ERRORS });
//       history.push(`/users/${userId}`);
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

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
