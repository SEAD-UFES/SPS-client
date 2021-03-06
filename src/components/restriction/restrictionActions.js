import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import { GET_RESTRICTION, GET_RESTRICTIONS, RESTRICTIONS_LOADING } from "./restrictionActionTypes";

//courses loading
export const setRestrictionsLoading = () => {
  return {
    type: RESTRICTIONS_LOADING
  };
};

export const createRestriction = (restrictionData, callback_ok) => dispatch => {
  spsApi
    .post("/v1/restrictions", restrictionData)
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

export const getRestriction = restriction_id => dispatch => {
  spsApi
    .get(`/v1/restrictions/${restriction_id}`)
    .then(res =>
      dispatch({
        type: GET_RESTRICTION,
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

export const updateRestriction = (restrictionData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/restrictions/${restrictionData.id}`, restrictionData)
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

export const deleteRestriction = (restriction_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/restrictions/${restriction_id}`)
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

export const getRestrictions = () => dispatch => {
  dispatch(setRestrictionsLoading());
  spsApi
    .get("/v1/restrictions")
    .then(res =>
      dispatch({
        type: GET_RESTRICTIONS,
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
