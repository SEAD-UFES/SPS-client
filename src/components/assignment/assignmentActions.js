import { GET_ERRORS } from "../../actions/types";
import { GET_ASSIGNMENT, GET_ASSIGNMENTS, ASSIGNMENTS_LOADING } from "./assignmentActionTypes";

import axios from "axios";

export const createAssignment = (assignmentData, callback_ok) => dispatch => {
  axios
    .post("/v1/assignments", assignmentData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getAssignment = assignment_id => dispatch => {
  axios
    .get(`/v1/assignments/${assignment_id}`)
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
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

export const updateAssignment = (assignmentData, callback_ok) => dispatch => {
  axios
    .put(`/v1/assignments/${assignmentData.id}`, assignmentData)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAssignment = (assignment_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/assignments/${assignment_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//courses loading
export const setAssignmentsLoading = () => {
  return {
    type: ASSIGNMENTS_LOADING
  };
};

export const getAssignments = () => dispatch => {
  dispatch(setAssignmentsLoading());
  axios
    .get("/v1/assignments")
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENTS,
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
