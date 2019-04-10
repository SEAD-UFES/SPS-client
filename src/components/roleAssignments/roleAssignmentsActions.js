import { GET_ERRORS } from "actions/types";
import { GET_ROLEASSIGNMENT, GET_ROLEASSIGNMENTS, ROLEASSIGNMENTS_LOADING } from "./roleAssignmentsActionTypes";

import axios from "axios";

export const createRoleAssignment = (roleAssignmentData, callback_ok) => dispatch => {
  axios
    .post("/v1/roles", roleAssignmentData)
    .then(res => {
      callback_ok(res.data.id);
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
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

export const getRoleAssignment = roleAssignment_id => dispatch => {
  dispatch(setRoleAssignmentsLoading());
  axios
    .get(`/v1/roles/${roleAssignment_id}`)
    .then(res =>
      dispatch({
        type: GET_ROLEASSIGNMENT,
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

export const updateRoleAssignment = (roleAssignmentData, callback_ok) => dispatch => {
  axios
    .put(`/v1/roles/${roleAssignmentData.id}`, roleAssignmentData)
    .then(res => {
      callback_ok(roleAssignmentData.id);
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
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

export const deleteRoleAssignment = (roleAssignment_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/roles/${roleAssignment_id}`)
    .then(res => {
      callback_ok();
    })
    .catch(err => {
      if (err.response) {
        let errors = err.response.data;
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
export const setRoleAssignmentsLoading = () => {
  return {
    type: ROLEASSIGNMENTS_LOADING
  };
};

export const getRoleAssignments = () => dispatch => {
  dispatch(setRoleAssignmentsLoading());
  axios
    .get("/v1/roles")
    .then(res =>
      dispatch({
        type: GET_ROLEASSIGNMENTS,
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
