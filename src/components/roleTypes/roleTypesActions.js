import { GET_ERRORS } from "actions/types";
import {
  GET_ROLETYPE,
  GET_ROLETYPES,
  ROLETYPES_LOADING
} from "./roleTypesActionTypes";

import axios from "axios";

export const createRoleType = (roleTypeData, callback_ok) => dispatch => {
  axios
    .post("/v1/roletypes", roleTypeData)
    .then(res => {
      callback_ok(res.data.id);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getRoleType = roleType_id => dispatch => {
  dispatch(setRoleTypesLoading());
  axios
    .get(`/v1/roletypes/${roleType_id}`)
    .then(res =>
      dispatch({
        type: GET_ROLETYPE,
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

export const updateRoleType = (roleTypeData, callback_ok) => dispatch => {
  axios
    .put(`/v1/roletypes/${roleTypeData.id}`, roleTypeData)
    .then(res => {
      callback_ok(roleTypeData.id);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteRoleType = (roleType_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/roletypes/${roleType_id}`)
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

//roleTypes loading
export const setRoleTypesLoading = () => {
  return {
    type: ROLETYPES_LOADING
  };
};

export const getRoleTypes = () => dispatch => {
  dispatch(setRoleTypesLoading());
  axios
    .get("/v1/roletypes")
    .then(res =>
      dispatch({
        type: GET_ROLETYPES,
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
