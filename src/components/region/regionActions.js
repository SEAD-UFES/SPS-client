import { GET_ERRORS } from "../../actions/types";
import { GET_REGION, GET_REGIONS, REGIONS_LOADING } from "./regionActionTypes";

import axios from "axios";

//courses loading
export const setRegionsLoading = () => {
  return {
    type: REGIONS_LOADING
  };
};

export const createRegion = (regionData, callback_ok) => dispatch => {
  axios
    .post("/v1/regions", regionData)
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

export const getRegion = region_id => dispatch => {
  axios
    .get(`/v1/regions/${region_id}`)
    .then(res =>
      dispatch({
        type: GET_REGION,
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

export const updateRegion = (regionData, callback_ok) => dispatch => {
  axios
    .put(`/v1/regions/${regionData.id}`, regionData)
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

export const deleteRegion = (region_id, callback_ok) => dispatch => {
  axios
    .delete(`/v1/regions/${region_id}`)
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

export const getRegions = () => dispatch => {
  dispatch(setRegionsLoading());
  axios
    .get("/v1/regions")
    .then(res =>
      dispatch({
        type: GET_REGIONS,
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
