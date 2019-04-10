import axios from "axios";

import { GET_ERRORS } from "actions/types";
import { GET_PUBLICATIONTYPE, GET_PUBLICATIONTYPES, PUBLICATIONTYPES_LOADING } from "./publicationTypeActionTypes";

//processPublications loading
export const setPublicationTypesLoading = () => {
  return {
    type: PUBLICATIONTYPES_LOADING
  };
};

export const createPublicationType = (publicationTypeData, callback_ok) => dispatch => {
  axios
    .post("/v1/publicationtypes", publicationTypeData)
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

export const getPublicationType = publicationType_id => dispatch => {
  dispatch(setPublicationTypesLoading());
  axios
    .get(`/v1/publicationtypes/${publicationType_id}`)
    .then(res =>
      dispatch({
        type: GET_PUBLICATIONTYPE,
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

export const updatePublicationType = (publicationTypeData, callback_ok) => dispatch => {
  axios
    .put(`/v1/publicationtypes/${publicationTypeData.id}`, publicationTypeData)
    .then(res => {
      callback_ok(publicationTypeData.id);
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

export const deletePublicationType = (publicationType_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/publicationtypes/${publicationType_id}`)
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

export const getPublicationTypes = () => dispatch => {
  dispatch(setPublicationTypesLoading());
  axios
    .get("/v1/publicationtypes")
    .then(res =>
      dispatch({
        type: GET_PUBLICATIONTYPES,
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
