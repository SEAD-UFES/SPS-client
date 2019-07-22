import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import {
  GET_ROLEPERMISSION,
  //GET_ROLEPERMISSIONS,
  ROLEPERMISSIONS_LOADING
} from "./rolePermissionActionTypes";

export const setRolePermissionLoading = () => {
  return {
    type: ROLEPERMISSIONS_LOADING
  };
};

export const createRolePermission = (rolePermissionData, callback_ok) => dispatch => {
  spsApi
    .post("/v1/rolepermissions", rolePermissionData)
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

export const getRolePermission = rolePermission_id => dispatch => {
  dispatch(setRolePermissionLoading());
  spsApi
    .get(`/v1/rolepermissions/${rolePermission_id}`)
    .then(res => {
      dispatch({
        type: GET_ROLEPERMISSION,
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

export const deleteRolePermission = (rolePermission_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/rolepermissions/${rolePermission_id}`)
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
