import axios from "axios";

import {
  GET_ERRORS,
  GET_PROCESS,
  GET_PROCESSES,
  PROCESS_LOADING
} from "./types";

//create user
export const createProcess = (processData, history) => dispatch => {
  axios
    .post("/v1/selectiveprocesses", processData)
    .then(res => {
      console.log(res);
      history.push(`/processes/${res.data.id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get Process
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

//Get Process List
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
      console.log("GET_PROCESSES error");
      dispatch({
        type: GET_PROCESSES,
        payload: null
      });
    });
};

//Update User Data
// export const updateUser = (userId, userData, history) => dispatch => {
//   axios
//     .put(`/v1/users/${userId}`, userData)
//     .then(res => {
//       dispatch({ type: CLEAR_ERRORS });
//       history.push(`/users/${userId}`);
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

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
