import { GET_ERRORS } from "actions/types";
import {
  GET_PROCESSPUBLICATIONTYPE,
  GET_PROCESSPUBLICATIONTYPES,
  PROCESSPUBLICATIONTYPES_LOADING
} from "./processPublicationTypesActionTypes";

import axios from "axios";

export const createProcessPublicationType = (
  processPublicationTypeData,
  callback_ok
) => dispatch => {
  axios
    .post("/v1/publicationtypes", processPublicationTypeData)
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

export const getProcessPublicationType = processPublication_id => dispatch => {
  dispatch(setProcessPublicationTypesLoading());
  axios
    .get(`/v1/publicationtypes/${processPublication_id}`)
    .then(res =>
      dispatch({
        type: GET_PROCESSPUBLICATIONTYPE,
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

export const updateProcessPublicationType = (
  processPublicationTypeData,
  callback_ok
) => dispatch => {
  axios
    .put(
      `/v1/publicationtypes/${processPublicationTypeData.id}`,
      processPublicationTypeData
    )
    .then(res => {
      callback_ok(processPublicationTypeData.id);
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

export const deleteProcessPublicationType = (
  processPublication_id,
  callback_ok
) => dispatch => {
  axios
    .delete(`/v1/publicationtypes/${processPublication_id}`)
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

//processPublications loading
export const setProcessPublicationTypesLoading = () => {
  return {
    type: PROCESSPUBLICATIONTYPES_LOADING
  };
};

export const getProcessPublicationTypes = () => dispatch => {
  dispatch(setProcessPublicationTypesLoading());
  axios
    .get("/v1/publicationtypes")
    .then(res =>
      dispatch({
        type: GET_PROCESSPUBLICATIONTYPES,
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
