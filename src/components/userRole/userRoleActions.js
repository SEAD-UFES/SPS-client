import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import { GET_USERROLE, GET_USERROLES, USERROLES_LOADING } from "./userRoleActionTypes";

export const createUserRole = (userRoleData, callback_ok) => dispatch => {
  spsApi
    .post("/v1/userroles", userRoleData)
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

export const getUserRole = userRole_id => dispatch => {
  dispatch(setUserRolesLoading());
  spsApi
    .get(`/v1/userroles/${userRole_id}`)
    .then(res =>
      dispatch({
        type: GET_USERROLE,
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

export const updateUserRole = (userRoleData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/userroles/${userRoleData.id}`, userRoleData)
    .then(res => {
      callback_ok(userRoleData.id);
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

export const deleteUserRole = (userRole_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/userroles/${userRole_id}`)
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

//userRoles loading
export const setUserRolesLoading = () => {
  return {
    type: USERROLES_LOADING
  };
};

export const getUserRoles = () => dispatch => {
  dispatch(setUserRolesLoading());
  spsApi
    .get("/v1/userroles")
    .then(res =>
      dispatch({
        type: GET_USERROLES,
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
