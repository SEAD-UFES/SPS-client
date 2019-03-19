import { GET_ERRORS } from "actions/types";
import {
  GET_PROCESSPUBLICATION,
  GET_PROCESSPUBLICATIONS,
  PROCESSPUBLICATIONS_LOADING
} from "./processPublicationsActionTypes";

import axios from "axios";

export const createProcessPublication = (
  processPublicationData,
  callback_ok
) => dispatch => {
  axios
    .post("/v1/roles", processPublicationData)
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

export const getProcessPublication = processPublication_id => dispatch => {
  dispatch(setProcessPublicationsLoading());
  axios
    .get(`/v1/publications/${processPublication_id}`)
    .then(res =>
      dispatch({
        type: GET_PROCESSPUBLICATION,
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

export const updateProcessPublication = (
  processPublicationData,
  callback_ok
) => dispatch => {
  axios
    .put(
      `/v1/publications/${processPublicationData.id}`,
      processPublicationData
    )
    .then(res => {
      callback_ok(processPublicationData.id);
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

export const deleteProcessPublication = (
  processPublication_id,
  callback_ok
) => dispatch => {
  axios
    .delete(`/v1/publications/${processPublication_id}`)
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
export const setProcessPublicationsLoading = () => {
  return {
    type: PROCESSPUBLICATIONS_LOADING
  };
};

export const getProcessPublications = () => dispatch => {
  dispatch(setProcessPublicationsLoading());
  axios
    .get("/v1/publications")
    .then(res =>
      dispatch({
        type: GET_PROCESSPUBLICATIONS,
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
