import spsApi from "apis/spsServer";

import { GET_ERRORS } from "actions/types";
import {
  GET_PUBLICATION,
  //GET_PUBLICATIONS,
  PUBLICATIONS_LOADING
} from "./publicationActionTypes";

//processPublicationss loading
export const setPublicationsLoading = () => {
  return {
    type: PUBLICATIONS_LOADING
  };
};

export const createPublication = (PublicationData, callback_ok) => dispatch => {
  let formData = new FormData();
  formData.append("date", PublicationData.date);
  formData.append("name", PublicationData.name);
  formData.append("selectiveProcess_id", PublicationData.selectiveProcess_id);

  if (PublicationData.call_id) {
    formData.append("call_id", PublicationData.call_id);
  }

  if (PublicationData.step_id) {
    formData.append("step_id", PublicationData.step_id);
  }

  if (PublicationData.description) {
    formData.append("description", PublicationData.description);
  }

  formData.append("publicationType_id", PublicationData.publicationType_id);

  formData.append("valid", PublicationData.valid);

  formData.append("file", PublicationData.file);

  spsApi
    .post("/v1/publications", formData)
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

export const getPublication = publication_id => dispatch => {
  dispatch(setPublicationsLoading());
  spsApi
    .get(`/v1/publications/${publication_id}`)
    .then(res =>
      dispatch({
        type: GET_PUBLICATION,
        payload: res.data
      })
    )
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

export const updatePublication = (PublicationData, callback_ok) => dispatch => {
  spsApi
    .put(`/v1/publications/${PublicationData.id}`, PublicationData)
    .then(res => {
      callback_ok(PublicationData.id);
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

export const deletePublication = (publication_id, callback_ok) => dispatch => {
  spsApi
    .delete(`/v1/publications/${publication_id}`)
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
